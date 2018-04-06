import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";

export interface KeyValuePair {
  key: any;
  value: any;
}
export interface PieModel extends KeyValuePair {
  color: string;
}

@Component({
  selector: "app-pie-chart",
  templateUrl: "./pie-chart.component.html",
  styleUrls: ["./pie-chart.component.scss"]
})
export class PieChartComponent implements OnInit {
  @ViewChild("chartCanvas") chartCanvas: ElementRef;
  private data: KeyValuePair[] = [];
  private colors: KeyValuePair[] = [];
  private pieModel: PieModel[] = [];
  private height = 160;
  private width = 170;

  constructor() {
    this.data = [
      { key: "SPEED", value: 40 },
      { key: "WEB", value: 90 },
      { key: "BROKER", value: 100 },
      { key: "MINT", value: 10 }
    ];
    this.colors = [
      { key: "SPEED", value: "#b20098" },
      { key: "WEB", value: "#501ed0" },
      { key: "BROKER", value: "#349e7a" },
      { key: "MINT", value: "#ff003f" }
    ];
  }

  ngOnInit() {
    this.pieModel = this.data.map(kv => {
      const colorObj = this.colors.find(k => k.key === kv.key);
      return { ...kv, color : colorObj.value || 'red' };
    });
    this.createPie();
    // this.createDoughNut();
  }

  createPie() {
    const chartApi = new ChartApi();
    const canvas = this.chartCanvas.nativeElement;
    const canvasWidth = this.width - 10;
    canvas.height = this.height;
    canvas.width = canvasWidth;
    const ctx = canvas.getContext("2d");
    const total = this.data.reduce((a, c) => a + +c.value, 0);
    let startAngle = 0;
    const radius = Math.min(canvasWidth / 2, this.height / 2);
    this.pieModel.forEach(kv => {
      const currValue = +kv.value;
      // const color = this.colors.find(k => k.key === kv.key);
      const currAngle = 2 * Math.PI * currValue / total;
      const labelX =
        canvasWidth / 2 + radius / 2 * Math.cos(startAngle + currAngle / 2);
      const labelY =
        this.height / 2 + radius / 2 * Math.sin(startAngle + currAngle / 2);

      chartApi.drawPieSlice(
        ctx,
        canvasWidth / 2,
        this.height / 2,
        radius,
        startAngle,
        startAngle + currAngle,
        kv.color
      );
      const labelText = Math.round(100 * currValue / total);
      ctx.fillStyle = "white";
      ctx.font = "bold 12px Arial";
      ctx.fillText(`${labelText}%`, labelX, labelY);
      startAngle += currAngle;
    });
  }
  createDoughNut() {
    const chartApi = new ChartApi();
    const doughnutHoleSize = 0.5;
    const canvasWidth = this.width - 5;
    const canvas = this.chartCanvas.nativeElement;
    canvas.height = this.height;
    canvas.width = canvasWidth;
    const ctx = canvas.getContext("2d");
    const total = this.data.reduce((a, c) => a + +c.value, 0);
    let startAngle = 0;
    const radius = Math.min(canvasWidth / 2, this.height / 2);
    this.pieModel.forEach(kv => {
      const currValue = +kv.value;
      const currAngle = 2 * Math.PI * currValue / total;
      const labelX =
        canvasWidth / 2 + radius / 2 * Math.cos(startAngle + currAngle / 2);
      const labelY =
        this.height / 2 + radius / 2 * Math.sin(startAngle + currAngle / 2);

      chartApi.drawPieSlice(
        ctx,
        canvasWidth / 2,
        this.height / 2,
        radius,
        startAngle,
        startAngle + currAngle,
        kv.color
      );
      // const labelText = Math.round(100 * currValue / total);
      // ctx.fillStyle = "white";
      // ctx.font = "bold 12px Arial";
      // ctx.fillText(`${labelText}%`, labelX, labelY);
      startAngle += currAngle;
    });
    chartApi.drawPieSlice(
      ctx,
      canvasWidth / 2,
      this.height / 2,
      doughnutHoleSize * radius,
      0,
      2 * Math.PI,
      "#ffffff"
    );
  }
}

class ChartApi {
  drawLine(ctx, startX, startY, endX, endY) {
    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.stroke();
  }
  drawArc(ctx, centerX, centerY, radius, startAngle, endAngle) {
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.stroke();
  }
  drawPieSlice(ctx, centerX, centerY, radius, startAngle, endAngle, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, radius, startAngle, endAngle);
    ctx.closePath();
    ctx.fill();
  }
}
