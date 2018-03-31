import { NgModule } from '@angular/core';
import { CoolInfiniteGridComponent } from './infinite-grid.component';
export { CoolInfiniteGridComponent } from './infinite-grid.component';
export { IIterator, IIterated } from './iterator.interface';



@NgModule({

  exports: [CoolInfiniteGridComponent],

  declarations: [CoolInfiniteGridComponent]

})

export class CoolInfiniteGridModule {

}
