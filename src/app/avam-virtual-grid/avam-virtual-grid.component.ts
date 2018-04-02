import { Component, OnInit, Input, ChangeDetectionStrategy, ElementRef, ViewContainerRef, ViewChild, TemplateRef } from '@angular/core';
import { DataItemIterator, PageView } from './models';


const GRID_PARENT_ELEM_ATTRIB_NAME = 'avam-virtual-grid-container';
const NEXT_ROWSET_SIZE = 5;


@Component({
  selector: 'avam-virtual-grid',
  templateUrl: './avam-virtual-grid.component.html',
  styleUrls: ['./avam-virtual-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvamVirtualGridComponent implements OnInit {

  //#region Private Fields
  @ViewChild('rowTemplate') rowTemplate: TemplateRef<any>;
  private gridParentElem: HTMLElement;
  private pageView: PageView;
  //#endregion

  //#region Public Fields
  //#endregion

  //#region External Input/Output
  @Input() itemIterator: DataItemIterator<any[]>;
  //#endregion

  //#region ctor
  constructor(private hostElem: ElementRef, private viewContainer: ViewContainerRef) {

  }
  //#endregion

  //#region NG Lifecycle Hooks
  async ngOnInit(): Promise<any> {
    this.validateInput();
    this.gridParentElem = this.findParentElement();
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
      const row = this.rowTemplate.createEmbeddedView({ item: item });
      this.pageView.renderedItems.push(row);
      this.viewContainer.insert(row);
    });
    
  }
  //#endregion

  //#region Data Methods
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
  //#endregion

}
