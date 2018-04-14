import { ChartBuilder } from "../chart-builder";
import {
  PieChartOptions,
  LineChartOptions,
  ColumnChartOptions
} from "../model";

export class CanvasChartBuilder extends ChartBuilder {
  setOptions(options: any) {}
  buildPieChart(options: PieChartOptions) {}
  buildDoughnutChart(options: PieChartOptions) {}
  buildLineChart(options: LineChartOptions) {}
  buildColumnChart(options: ColumnChartOptions) {}
}
