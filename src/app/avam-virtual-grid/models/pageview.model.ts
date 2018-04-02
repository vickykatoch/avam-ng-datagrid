import { EmbeddedViewRef } from '@angular/core';

export class PageView {
  itemsFromIndex: number;
  height: number;
  scrollTop: number;
  nativeElement: any;
  isLastViewPort: boolean;
  items: any[] = [];
  renderedItems: EmbeddedViewRef<Object>[];


  constructor() {
    this.renderedItems = [];
  }

  get itemCount() {
    return this.items.length;
  }
  get bottomScrollTop() {
    return this.scrollTop + this.height;
  }
}
