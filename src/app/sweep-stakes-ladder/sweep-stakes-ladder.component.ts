import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { DataBuilder } from './data/data-generator';
import { DefaultUIState } from './hgrid/default-ui-state';

@Component({
  selector: 'sweep-stakes-ladder',
  templateUrl: './sweep-stakes-ladder.component.html',
  styleUrls: ['./sweep-stakes-ladder.component.scss']
})
export class SweepStakesLadderComponent implements OnInit {
  @ViewChild('dg1') dg1: ElementRef;


  constructor() { }

  ngOnInit() {
    const data = DataBuilder.build(20);
    const grid = new fin.Hypergrid(this.dg1.nativeElement,{data : data});
    DefaultUIState(grid);
  }

}
