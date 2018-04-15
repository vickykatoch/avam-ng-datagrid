import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoolInfiniteGridModule } from './cool-grid/grid-module';
import { MyGridComponent } from './my-grid/my-grid.component';
import { AvamGridModule } from './avam-grid';
import { AvamVirtualGridComponent } from './avam-virtual-grid/avam-virtual-grid.component';
import { GridContentComponent } from './avam-virtual-grid/grid-content/grid-content.component';
import {ColorPickerModule} from './color-picker';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { FxwidgetComponent } from './fxwidget/fxwidget.component';
import { FxWidgetHostComponent } from './fx-widget-host/fx-widget-host.component';

@NgModule({
  declarations: [
    AppComponent,
    MyGridComponent,
    AvamVirtualGridComponent,
    GridContentComponent,
    PieChartComponent,
    FxwidgetComponent,
    FxWidgetHostComponent
  ],
  imports: [
    BrowserModule,
    CoolInfiniteGridModule,
    AvamGridModule,
    ColorPickerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
