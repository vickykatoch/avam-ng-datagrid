import { EventEmitter } from "@angular/core";

export class GridApi {

  refreshed = new EventEmitter();

  constructor() {

  }
  refresh() {
    this.refreshed.next({});
  }
}
