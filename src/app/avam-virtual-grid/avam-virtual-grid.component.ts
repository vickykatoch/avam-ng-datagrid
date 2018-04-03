import { Component, OnInit, Input,Renderer2,EventEmitter, ChangeDetectionStrategy,ChangeDetectorRef, ElementRef, ViewContainerRef, ViewChild, TemplateRef, RendererStyleFlags2, Output } from '@angular/core';
import { DataItemIterator, GridColumn, GridApi } from './models';


const GRID_PARENT_ELEM_ATTRIB_NAME = 'avm-virtual-grid-container';
const NEXT_ROWSET_SIZE = 5;

const HEADER_ROW_HEIGHT = 28;
const BODY_ROW_HEIGHT = 25;

@Component({
  selector: 'avam-virtual-grid',
  templateUrl: './avam-virtual-grid.component.html',
  styleUrls: ['./avam-virtual-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvamVirtualGridComponent implements OnInit {

  //#region Private Fields
  @ViewChild('rowTemplate') rowTemplate: TemplateRef<any>;
  @ViewChild('gridBody') gridBody : ElementRef;
  @ViewChild('gridHeader') gridHeader : ElementRef;
  private gridApi = new GridApi();
  private gridParentElem: HTMLElement;

  //#endregion

  //#region Public Fields
  //#endregion

  //#region External Input/Output
  @Input() itemIterator: DataItemIterator<any[]>;
  @Input() columns: GridColumn[] = [];
  @Output() initialized = new EventEmitter<GridApi>();
  //#endregion

  //#region ctor
  constructor(private hostElem: ElementRef,private renderer: Renderer2, private changeDetector: ChangeDetectorRef) {

  }
  //#endregion

  //#region NG Lifecycle Hooks
  async ngOnInit(): Promise<any> {
    this.validateInput();
    this.gridParentElem = this.findParentElement();
    this.setGridDimensions();
    this.initialized.next(this.gridApi);
    this.gridApi.refreshed.subscribe(x=> {
      this.changeDetector.markForCheck();
    });
    this.gridBody.nativeElement.onscroll = this.onContainerScroll.bind(this);
  }
  //#endregion

  //#region Helper Methods
  private validateInput() {
    if (!this.itemIterator) {
      throw new Error('Item iterator to collection must be passed');
    }
  }
  private findParentElement(): HTMLElement {
    let currNode = this.hostElem.nativeElement.parentNode;
    while (currNode) {
      if (
        currNode.attributes &&
        currNode.attributes[GRID_PARENT_ELEM_ATTRIB_NAME]
      ) {
        break;
      }
      currNode = currNode.parentNode;
    }
    if (currNode) {
      return currNode;
    }
    const parent = this.hostElem.nativeElement.parentNode;
    parent.setAttribute(GRID_PARENT_ELEM_ATTRIB_NAME, "true");
    return parent;
  }
  private setGridDimensions() {
    const height = this.gridParentElem.clientHeight - HEADER_ROW_HEIGHT;
    const width = this.gridParentElem.clientWidth;
    this.renderer.setStyle(this.gridBody.nativeElement, 'margin-top',`${HEADER_ROW_HEIGHT}px`, RendererStyleFlags2.Important);
    this.renderer.setStyle(this.gridBody.nativeElement, 'height',`${height}px`, RendererStyleFlags2.Important);
  }
  //#endregion

  //#region Event Handlers
  private onContainerScroll(evt: Event) {
    const position = +evt.target['scrollLeft'];
    this.renderer.setStyle(this.gridHeader.nativeElement,'left',`${-position}px`);
  }
  //#endregion
}
