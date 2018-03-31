import {
  Component,
  ViewChild,
  TemplateRef,
  ElementRef,
  ViewContainerRef
} from "@angular/core";
import { GridColumn } from "./avam-grid";
import { EmployeeBuilder } from "./data-builder";
import { CoolInfiniteGridComponent } from "./cool-grid/infinite-grid.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "app";
  myItemIterator;
  items = [];
  columns: GridColumn[] = [];
  data = [];
  @ViewChild("tmpl") rowTemplate: TemplateRef<any>;
  @ViewChild("container", { read: ViewContainerRef })
  container;
  @ViewChild(CoolInfiniteGridComponent) grid;

  tplData = [];

  constructor() {
    this.createColumns();
    this.data = EmployeeBuilder.buildEmpData(100);

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
    this.tplData = [{ item: "hello" }, { item: "World" }];
    this.tplData.forEach(item => {
      this.container.createEmbeddedView(this.rowTemplate, item);
    });
  }

  add() {
    this.tplData[0] = { item: "bye" };
  }
  isFlashing = false;
  change() {
    this.grid.update();
    this.isFlashing = !this.isFlashing;
    // const handle = setInterval(() => {
    //   const idx = Math.floor(Math.random() * 20);
    //   const item = this.items[idx];
    //   item.name = Math.floor(Math.random() * 1000);
    //   item.color = "#" + (((1 << 24) * Math.random()) | 0).toString(16);
    //   if(!this.isFlashing) {
    //     clearInterval(handle);
    //   }
    // }, 50);
  }
}
