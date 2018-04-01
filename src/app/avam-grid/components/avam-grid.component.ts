import {
  Component,
  OnInit,
  ContentChildren,
  ChangeDetectionStrategy,
  QueryList,
  Input,
  ViewChild,
  ElementRef,
  ViewContainerRef,
  TemplateRef,
  AfterViewInit,
  ChangeDetectorRef
} from "@angular/core";
import { AvamGridHeaderColumnComponent } from "./avam-grid-header-column/avam-grid-header-column.component";
import { GridColumn, ItemIterator } from "../api";
import { PageView } from "../api/page-view-model";

const ROWS_PER_PAGE_MULTIPLIER = 1.3;
const ROW_BATCH = 5;
const PAGE_VIEW_MOVE_BOUNDARY_MULTIPLIER = 0.4;
const SCROLL_HOST_ATTRIBUTE_NAME = "avam-grid-container";
const MILLISECONDS_TO_WAIT_ON_SCROLLING_BEFORE_RENDERING = 10;

interface ViewParams {
  width: number;
  height: number;
  headerHeight: number;
  bodyHeight?: number;
  pageHeight?: number;
  pageWidth?: number;
  rowsPerPage?: number;
  rowHeight?: number;
}

@Component({
  selector: "avam-grid",
  templateUrl: "./avam-grid.component.html",
  styleUrls: ["./avam-grid.component.scss"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvamGridComponent implements OnInit {
  //#region Private Fields
  @ViewChild("rowTemplate") rowTemplate: TemplateRef<any>;
  @ViewChild("vcr", { read: ViewContainerRef })
  viewContainer: ViewContainerRef;
  private scrollHost: HTMLElement;
  @ViewChild("header") headerElem: ElementRef;
  @ViewChild("body") bodyElem: ElementRef;
  private gridlHost: HTMLElement;
  private detectChanges = false;
  private viewParams: ViewParams;
  private pageView: PageView;
  //#endregion

  //#region Public Fields

  _data: any;
  rowWidth: number = 0;
  //#endregion

  //#region External Input/Output
  @Input() columns: GridColumn[] = [];
  @Input() itemIterator: ItemIterator<any>;

  @Input()
  set data(value: any) {
    this._data = value;
  }
  get data(): any {
    return this._data;
  }
  @Input() rowHeight: number = 25;
  //#endregion

  //#region ctor
  constructor(
    private hostElem: ElementRef,
    private changeDetector: ChangeDetectorRef
  ) {}
  //#endregion

  //#region NG Lifecycle Hooks
  ngOnInit() {
    // ngOnInit() {
    this.validateInput();
    this.gridlHost = this.getGridHost();

    this.calcViewParams();
    this.rowWidth = this.columns.reduce((acc, curr) => {
      return acc + curr.width;
    }, 0);
    this.bodyElem.nativeElement.style.marginTop = `${
      this.viewParams.headerHeight
    }px`;
    this.bodyElem.nativeElement.onscroll = this.onContainerScroll.bind(this);
    this.initialRender();
  }
  async ngAfterViewInit() {}
  ngDoCheck() {
    if (this.detectChanges) {
      this.detectChanges = false;
      this.changeDetector.markForCheck();
    }
  }
  //#endregion

  //#region Helper Methods
  private validateInput() {
    if (!this.columns || !this.columns.length) {
      throw new Error("Column list must be provided!");
    }
    if (!this.itemIterator) {
      throw new Error("Row iterator must be provided!");
    }
  }
  private getGridHost(): HTMLElement {
    let currNode = this.hostElem.nativeElement.parentNode;
    while (currNode) {
      if (
        currNode.attributes &&
        currNode.attributes[SCROLL_HOST_ATTRIBUTE_NAME]
      ) {
        break;
      }
      currNode = currNode.parentNode;
    }
    if (currNode) {
      return currNode;
    }
    const parent = this.hostElem.nativeElement.parentNode;
    parent.setAttribute(SCROLL_HOST_ATTRIBUTE_NAME, "true");
    return parent;
  }
  private onContainerScroll(evt: any) {
    const host = evt.target;
    if (host.scrollTop + host.clientHeight >= host.scrollHeight) {
      // debugger;
      this.renderAsync(host.scrollTop);
      this.changeDetector.markForCheck();
      console.log("Bottom Reached");
    }

    // this.renderAsync(evt.target.scrollTop)
    // console.log("Container scrolling");
  }
  private calcViewParams() {
    this.viewParams = {
      width: this.gridlHost.clientWidth,
      height: this.gridlHost.clientHeight,
      headerHeight: this.rowHeight
      // headerHeight: this.headerElem.nativeElement.clientHeight
    };
    const bodyHeight = this.viewParams.height - this.viewParams.headerHeight;
    const rowsPerPage = Math.ceil(
      Math.ceil(bodyHeight / this.rowHeight) * ROWS_PER_PAGE_MULTIPLIER
    );
    this.viewParams.rowHeight = this.rowHeight;
    this.viewParams.rowsPerPage = rowsPerPage;
    this.viewParams.pageHeight = rowsPerPage * this.rowHeight;
  }
  //#region Render
  private initialRender() {
    this.renderAsync(0);
  }
  private renderAsync(top: number) {
    let rowIndex = Math.ceil(top / this.rowHeight);
    rowIndex = rowIndex ? this.pageView.itemsFromIndex + 1 : rowIndex;
    const items = this.getItems(
      rowIndex,
      rowIndex ? ROW_BATCH : this.viewParams.rowsPerPage
    );
    if (items.length) {
      this.pageView = this.pageView || new PageView();
      this.pageView.scrollTop = top;
      this.pageView.itemsFromIndex += items.length;
      this.pageView.items.push(...items);
      this.pageView.height = this.calcPageViewHeight(items.length);
      this.renderPageView(rowIndex);
    }
  }
  private renderPageView(fromIndex: number) {
    for (let index = fromIndex; index < this.pageView.items.length; index++) {
      const rowView = this.rowTemplate.createEmbeddedView({
        row: this.pageView.items[index],
        columns: this.columns
      });
      this.pageView.renderedItems.push(rowView);
      this.viewContainer.insert(rowView);
    }
    if (fromIndex > 0) {
      this.pageView.items.splice(0, ROW_BATCH);
      let i = 0;
      while (i < ROW_BATCH) {
        const renderedRow = this.pageView.renderedItems.shift();
        renderedRow.destroy();
        i++;
      }
    }
    this.bodyElem.nativeElement.style.height = `${this.pageView.height}px`;
  }

  //#endregion

  private getItems(fromIndex: number, count: number): any[] {
    console.log(`Data Slice from : ${fromIndex} to ${fromIndex + count}`);
    const slicedRefData = [];
    for (let i = 0; i < count; i++) {
      slicedRefData[i] = this.data[fromIndex+i];
    }
    // const data = this.data.slice(fromIndex, fromIndex + count);
    return slicedRefData;
  }
  private calcPageViewHeight(itemsCount: number): number {
    // if(itemsCount===this.pageView.numberOfItems) {
    //   return this.pageView.height;
    // }
    return (this.pageView.height || 0) + itemsCount * this.viewParams.rowHeight;
    // const rowCount = Math.ceil(itemsCount/this.viewParams.)
  }

  //#endregion

  //#region GUI Callbacks
  getRowStyle() {
    return {
      width: `${this.rowWidth}`
    };
  }
  //#endregion

  //#region Event Handlers
  //#endregion
}
