import * as model from './model';
import { ChartBuilder } from './chart-builder';
import { CanvasChartBuilder } from './canvas/canvas-chart.builder';
import { D3ChartBuilder } from './d3/d3-chart.builder';

export class ChartBuilderFactory {

  static getChartBuilder(type: model.ChartBuilderType) : ChartBuilder {
    let chartBuilder = new CanvasChartBuilder();
    if( type === model.ChartBuilderType.D3) {
      chartBuilder = new D3ChartBuilder();
    }
    return chartBuilder;
  }

}
