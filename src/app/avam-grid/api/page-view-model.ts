import { EmbeddedViewRef } from '@angular/core';

export class PageView {
  itemsFromIndex: number = 0;
  height: number;
  scrollTop: number;
  nativeElement: any;
  isLastViewPage: boolean;

  items: any[] = [];

  get numberOfItems() {
    return this.items.length;
  }

  renderedItems: EmbeddedViewRef<Object>[];

  get bottomScrollTop() {
    return this.scrollTop + this.height;
  }

  constructor() {
    this.renderedItems = [];
  }
}
