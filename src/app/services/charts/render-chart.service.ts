import { Injectable } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min.js';

@Injectable({
  providedIn: 'root'
})
export class RenderChartService {
  chart: CanvasJS;
  
  constructor() { }

  renderChart(chartData : Array<JSON>, chartType : string = 'column') {
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Rarity Curve"
      },
      data: [{
        type: chartType,
        dataPoints: chartData
      }]
    });

    this.chart.render();
  }
}