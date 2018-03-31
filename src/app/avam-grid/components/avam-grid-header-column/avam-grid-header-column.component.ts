import { Component, OnInit, Input } from "@angular/core";
import { GridColumn } from "../../api";

@Component({
  selector: "avam-grid-header-column",
  templateUrl: "./avam-grid-header-column.component.html",
  styleUrls: ["./avam-grid-header-column.component.scss"]
})
export class AvamGridHeaderColumnComponent implements OnInit {
  //#region Private Fields
  //#endregion

  //#region Public Fields
  @Input() model: GridColumn;
  //#endregion

  //#region External Input/Output

  //#endregion

  //#region ctor
  constructor() {}
  //#endregion

  //#region NG Lifecycle Hooks
  ngOnInit() {}
  //#endregion

  //#region Helper Methods
  //#endregion

  //#region Event Handlers
  //#endregion
}
