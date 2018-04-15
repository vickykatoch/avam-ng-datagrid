import { Component, OnInit, ViewChild, ElementRef, ChangeDetectionStrategy, TemplateRef, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-fxwidget',
  templateUrl: './fxwidget.component.html',
  styleUrls: ['./fxwidget.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FxwidgetComponent implements OnInit {
  width = 0;
  data: PriceOrderQty[] = [];

  @ViewChild('container') container: ElementRef;
  @ViewChild('enlargedTemplate') enlargedTemplate: TemplateRef<any>;

  constructor(private changeDetecter: ChangeDetectorRef) {
    this.data = DataBuilder.generateData(5);

  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    this.width = this.container.nativeElement.offsetHeight;
    setTimeout(() => {
      this.changeDetecter.markForCheck();
    }, 0);
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
