import { Component, OnInit,Input, ViewContainerRef, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { PageView, DataItemIterator, GridColumn } from '../models';


@Component({
  selector: 'grid-content',
  // template: '<div class="avm-page-view" style="background:yellow;width:400px;">Page View</div>',
  templateUrl: './grid-content.component.html',
  styleUrls: ['./grid-content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridContentComponent implements OnInit {

  //#region Private Fields
  private gridParentElem: HTMLElement;
  private pageView: PageView;
  rowWidth = 0;
  //#endregion

  //#region External Input/Output
  @Input() itemIterator: DataItemIterator<any[]>;
  @ViewChild('rowTemplate') rowTemplate: TemplateRef<any>;
  @Input() columns: GridColumn[] = [];
  //#endregion

  //#region ctor
  constructor(private viewContainer: ViewContainerRef, private changeDetector: ChangeDetectorRef) { }
  //#endregion

  //#region NG Lifecycle Hooks
  async ngOnInit(): Promise<any> {
    this.rowWidth = this.columns.reduce((acc,curr)=> acc + curr.width,0);
    await this.initialRenderAsync();
  }
  //#endregion

  //#region Rendering Helpers
  async initialRenderAsync() {
    await this.reRenderFromScrollAsync(0);
  }
  private async reRenderFromScrollAsync(scrollTop: number): Promise<void> {
    const items = await this.fetchItems(0, 50);
    this.pageView = this.pageView || new PageView();
    this.pageView.items.push(...items);
    this.pageView.items.forEach(item => {
      const row = this.rowTemplate.createEmbeddedView({ item: item, columns : this.columns });
      this.pageView.renderedItems.push(row);
      this.viewContainer.insert(row);
    });
    this.changeDetector.markForCheck();
  }
  //#endregion

  //#region Data Helpers
  private async fetchItems(startIndex: number, length: number): Promise<any[]> {
    const data = [];
    const result = this.itemIterator.next(startIndex, length);
    if (result.value instanceof Promise) {
      return await result.value;
    } else if (result.value instanceof Array) {
      return result.value;
    }
  }
  //#endregion
}
