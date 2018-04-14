import { ChartBuilder } from "../chart-builder";
import {
  PieChartOptions,
  LineChartOptions,
  ColumnChartOptions
} from "../model";

export class D3ChartBuilder extends ChartBuilder {
  setOptions(options: any) {}
  buildPieChart(options: PieChartOptions) {}
  buildDoughnutChart(options: PieChartOptions) {}
  buildLineChart(options: LineChartOptions) {}
  buildColumnChart(options: ColumnChartOptions) {}
}
