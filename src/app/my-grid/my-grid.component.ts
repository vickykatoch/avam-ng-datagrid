import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs/observable/fromEvent";

@Component({
  selector: "my-grid",
  templateUrl: "./my-grid.component.html",
  styleUrls: ["./my-grid.component.scss"]
})
export class MyGridComponent implements OnInit {
  @ViewChild("body") bodyElem: ElementRef;
  @ViewChild("head") headElem: ElementRef;

  constructor() {}

  ngOnInit() {
    // debugger;
    this.bodyElem.nativeElement.style.marginTop = `${this.headElem.nativeElement.clientHeight}px`;
    fromEvent(this.bodyElem.nativeElement, "scroll").subscribe((evt : Event)=> {
      const pos = +evt.target['scrollLeft'];
      this.headElem.nativeElement.style.left = `${-pos}px`;
      console.log(evt.target['scrollLeft']);
    });
  }
  onClick() {

  }
}
