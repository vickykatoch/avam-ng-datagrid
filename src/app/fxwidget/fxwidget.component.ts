import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-fxwidget',
  templateUrl: './fxwidget.component.html',
  styleUrls: ['./fxwidget.component.scss']
})
export class FxwidgetComponent implements OnInit {
  width = 100;

  @ViewChild('container') container : ElementRef;

  constructor() { }

  ngOnInit() {
    this.width = this.container.nativeElement.offsetHeight;
  }

}
