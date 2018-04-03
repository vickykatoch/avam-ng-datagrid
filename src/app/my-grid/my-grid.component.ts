import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { fromEvent } from "rxjs/observable/fromEvent";
const SCROLL_HOST_ATTRIBUTE_NAME ='my-grid-container';

@Component({
  selector: "my-grid",
  templateUrl: "./my-grid.component.html",
  styleUrls: ["./my-grid.component.scss"]
})
export class MyGridComponent implements OnInit {
  hostParent: HTMLElement;
  @ViewChild('myGrid') gridWrapper : ElementRef;
  @ViewChild('headerHost') headerHost : ElementRef;
  @ViewChild('contentHost') contentHost : ElementRef;
  constructor(private hostElem: ElementRef) {}

  ngOnInit() {
    this.hostParent = this.getGridHost();
    this.setHostDimensions();
  }
  private getGridHost(): HTMLElement {
    let currNode = this.hostElem.nativeElement.parentNode;
    while (currNode) {
      if (
        currNode.attributes &&
        currNode.attributes[SCROLL_HOST_ATTRIBUTE_NAME]
      ) {
        break;
      }
      currNode = currNode.parentNode;
    }
    if (currNode) {
      return currNode;
    }
    const parent = this.hostElem.nativeElement.parentNode;
    parent.setAttribute(SCROLL_HOST_ATTRIBUTE_NAME, "true");
    return parent;
  }
  private setHostDimensions() {
    const hostHeight = this.hostParent.clientHeight;
    this.gridWrapper.nativeElement.style.height = `${hostHeight}px`;
    this.headerHost.nativeElement.style.height = `30px`;
    this.contentHost.nativeElement.style.height = `${hostHeight-30}px`;
  }
}
