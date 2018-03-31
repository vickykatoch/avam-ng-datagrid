import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'avam-grid-column',
  templateUrl: './avam-grid-column.component.html',
  styleUrls: ['./avam-grid-column.component.scss']
})
export class AvamGridColumnComponent implements OnInit {

  //#region Private Fields
  //#endregion

  //#region Public Fields
  //#endregion

  //#region External Input/Output
  @Input() value: any;
  //#endregion

  //#region ctor
  constructor() { }
  //#endregion

  //#region NG Lifecycle Hooks
  ngOnInit() {
  }
  //#endregion

  //#region Helper Methods
  //#endregion

  //#region Event Handlers
  //#endregion

}
