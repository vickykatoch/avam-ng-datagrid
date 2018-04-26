import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { UIState } from './utils/ui-state';
import { WorkerBuilder } from '../workers/worker-builder';

@Component({
  selector: 'app-hgrid-demo',
  templateUrl: './hgrid-demo.component.html',
  styleUrls: ['./hgrid-demo.component.css']
})
export class HgridDemoComponent implements OnInit {

  @ViewChild('griContainer') griContainer: ElementRef;


  constructor() { }

  ngOnInit() {
    const workerInfo = WorkerBuilder.build(DataBuilder.generateData);
    workerInfo.worker.port.addEventListener('message', e => {

      const grid = new fin.Hypergrid(this.griContainer.nativeElement, { data: e.data });
      UIState(grid);
    });
    // const data = DataBuilder.generateData(5);

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
  static generateData(): PriceOrderQty[] {
    const levels: number = 20;
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


function workerCode() {
  let connections = 0; // count active connections
  self.addEventListener("connect", (e) => {
    var port = e.ports[0];
    connections++;
    console.info(`Logger Clients : ${connections}`);
    port.addEventListener("message", function (e) {
      port.postMessage("Welcome to " + e.data + " (On port #" + connections + ")");
    }, false);
    port.start();
  }, false);
}
