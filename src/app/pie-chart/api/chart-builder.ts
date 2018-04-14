import * as model from './model';

export abstract class ChartBuilder {

  abstract setOptions(options: any);
  abstract buildPieChart(options: model.PieChartOptions);
  abstract buildDoughnutChart(options: model.PieChartOptions);
  abstract buildLineChart(options: model.LineChartOptions);
  abstract buildColumnChart(options: model.ColumnChartOptions);
}
