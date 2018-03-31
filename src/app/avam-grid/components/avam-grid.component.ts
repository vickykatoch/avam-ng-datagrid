import {
  Component,
  OnInit,
  ContentChildren,
  ChangeDetectionStrategy,
  QueryList,
  Input,
  ViewChild,
  ViewContainerRef,
  TemplateRef
} from "@angular/core";
import { AvamGridHeaderColumnComponent } from "./avam-grid-header-column/avam-grid-header-column.component";
import { GridColumn } from "../api/grid-column";

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
  vcr;
  //#endregion

  //#region Public Fields

  _data: any;
  viewWidth : number;
  //#endregion

  //#region External Input/Output
  @Input() columns: GridColumn[] = [];

  @Input()
  set data(value: any) {
    this._data = value;
    console.log(value);
  }
  get data(): any {
    return this._data;
  }
  //#endregion

  //#region ctor
  constructor() {}
  //#endregion

  //#region NG Lifecycle Hooks
  ngOnInit() {
    this.columns = this.columns || [];
    // this.viewWidth = this.columns.reduce((prev,current,idx,arr)=> {
    //   // return prev.width
    // },0);
    this.data.forEach(item => {
      this.vcr.createEmbeddedView(this.rowTemplate, {
        row: item,
        columns: this.columns
      });
    });
  }
  //#endregion

  //#region Helper Methods
  //#endregion

  //#region Event Handlers
  //#endregion
}
