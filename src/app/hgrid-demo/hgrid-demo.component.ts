import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UIState } from './utils/ui-state';

@Component({
  selector: 'app-hgrid-demo',
  templateUrl: './hgrid-demo.component.html',
  styleUrls: ['./hgrid-demo.component.css']
})
export class HgridDemoComponent implements OnInit {

  @ViewChild('griContainer')  griContainer : ElementRef;


  constructor() { }

  ngOnInit() {
    const data = DataBuilder.generateData(5);
    const grid = new fin.Hypergrid(this.griContainer.nativeElement,{data : data});
    UIState(grid);
  }

}


export interface PriceOrderQty {
  bqty?: number;
  baggQty?: number;
  bb?: number;
  ba?: number;
  aqty?: number;
  aaggQty?: number;

}
class DataBuilder {
  static generateData(levels: number): PriceOrderQty[] {
    const data: PriceOrderQty[] = [];
    for (let ctr = 0; ctr < levels; ctr++) {
      data.push({
        ba: 101.30,
        bb: 102.40,
        bqty: 10,
        baggQty: 20,
        aqty: 35,
        aaggQty: 70
      });
    }
    return data;
  }
}
