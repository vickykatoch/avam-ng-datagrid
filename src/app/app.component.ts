import {
  Component,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef
} from "@angular/core";
import { GridColumn, ItemIterator } from "./avam-grid";
import { EmployeeBuilder, Emp } from "./data-builder";
import { CoolInfiniteGridComponent } from "./cool-grid/infinite-grid.component";
import { IIterator } from "./cool-grid/grid-module";
import { DataItemIterator, IteratedItem, GridApi } from "./avam-virtual-grid";

class DataIterator implements DataItemIterator<any> {
  private data : any[] = [];

  constructor() {
    this.data = EmployeeBuilder.buildEmpData(103);
  }
  next(from: number, count: number): IteratedItem<any> {
    let toIndex = from + count;
    let done = false;
    if(toIndex  >= this.data.length) {
      toIndex = this.data.length;
      done = true;
    }
    console.log(`Fetching data from : [${from}] to : [${toIndex}]`);
    const values = this.data.slice(from, toIndex);
    return {
      value : Promise.resolve(values),
      done
    };
  }
}

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent  {
  title = "app";
  myItemIterator;
  private gridApi : GridApi;
  items = [];
  columns: GridColumn[] = [];
  data = [];
  @ViewChild("tmpl") rowTemplate: TemplateRef<any>;
  @ViewChild("container", { read: ViewContainerRef })
  container;
  @ViewChild(CoolInfiniteGridComponent) grid;

  dataIterator : ItemIterator<any>;
  itemDataIterator : DataIterator = new DataIterator();
  tplData = [];

  constructor() {
    this.createColumns();
    this.data.push(...EmployeeBuilder.buildEmpData(100));

    for (let i = 0; i < 20000; i++) {
      this.items.push({
        name: i,
        color: "#" + (((1 << 24) * Math.random()) | 0).toString(16)
      });
    }

    const self = this;

    this.myItemIterator = {
      next: function(fromIndex, length) {
        console.log(
          `Getting items from: ${fromIndex} to ${fromIndex + length}`
        );

        let value = self.items.slice(fromIndex, fromIndex + length);
        if (!value.length) {
          value = null;
        }

        return {
          value: Promise.resolve(value),
          done: false
        };
      }
    };

    this.dataIterator = {
      next: (fromIndex,length) => {
        return {
          value: Promise.resolve(EmployeeBuilder.buildEmpData(length)),
          done: false
        };
      }
    }
  }

  changeColor(item) {
    item.color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
  }

  private createColumns() {
    this.columns.push({ index: 0, name: "id", caption: "ID", width: 100 });
    this.columns.push({
      index: 0,
      name: "firstName",
      caption: "First Name",
      width: 400
    });
    this.columns.push({
      index: 0,
      name: "lastName",
      caption: "Last Name",
      width: 400
    });
    this.columns.push({ index: 0, name: "gender", caption: "Sex", width: 200 });
    this.columns.push({ index: 0, name: "gender", caption: "Age", width: 200 });
  }

  ngOnInit() {
    // this.tplData = [{ item: "hello" }, { item: "World" }];
    // this.tplData.forEach(item => {
    //   this.container.createEmbeddedView(this.rowTemplate, item);
    // });
  }
  onGridInitialized(api: GridApi) {
    this.gridApi=api;
  }
  add() {
    this.tplData[0] = { item: "bye" };
  }
  isFlashing = false;
  change() {

    const items = this.itemDataIterator['data'] as any[];
    // items[0].firstName= 'Balwinder';
    // this.gridApi.refresh();
    // item.firstName = 'Balwinder';
    // this.grid.update();
    this.isFlashing = !this.isFlashing;
    // debugger;
    const handle = setInterval(() => {
      const idx = Math.floor(Math.random() * 50);
      const item = items[idx];
      item.firstName = `FIRST NAME ${Math.floor(Math.random() * 1000)}`;
      item.lastName = `Last NAME ${Math.floor(Math.random() * 1000)}`;
      this.gridApi.refresh();
      if(!this.isFlashing) {
        clearInterval(handle);
      }
    }, 50);
  }
}


