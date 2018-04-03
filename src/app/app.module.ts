import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoolInfiniteGridModule } from './cool-grid/grid-module';
import { MyGridComponent } from './my-grid/my-grid.component';
import { AvamGridModule } from './avam-grid';
import { AvamVirtualGridComponent } from './avam-virtual-grid/avam-virtual-grid.component';
import { GridContentComponent } from './avam-virtual-grid/grid-content/grid-content.component';


@NgModule({
  declarations: [
    AppComponent,
    MyGridComponent,
    AvamVirtualGridComponent,
    GridContentComponent
  ],
  imports: [
    BrowserModule,
    CoolInfiniteGridModule,
    AvamGridModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
