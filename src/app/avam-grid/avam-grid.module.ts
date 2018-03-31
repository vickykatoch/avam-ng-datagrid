import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { AvamGridComponent } from "./components/avam-grid.component";
import { AvamGridColumnComponent } from "./components/avam-grid-column/avam-grid-column.component";
import { AvamGridHeaderColumnComponent } from "./components/avam-grid-header-column/avam-grid-header-column.component";

@NgModule({
  imports: [CommonModule],
  declarations: [
    AvamGridComponent,
    AvamGridColumnComponent,
    AvamGridHeaderColumnComponent
  ],
  exports: [
    AvamGridComponent,
    AvamGridColumnComponent,
    AvamGridHeaderColumnComponent
  ]
})
export class AvamGridModule {}
