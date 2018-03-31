import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CoolInfiniteGridModule } from './cool-grid/grid-module';
import { MyGridComponent } from './my-grid/my-grid.component';
import { AvamGridModule } from './avam-grid';


@NgModule({
  declarations: [
    AppComponent,
    MyGridComponent
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
