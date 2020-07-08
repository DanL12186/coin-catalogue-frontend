import { Injectable } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min.js';

@Injectable({
  providedIn: 'root'
})

export class ChartService {
  chart: CanvasJS;
  
  constructor() { }

  format(data: JSON): Array<JSON> {
    const formattedData = []

    for (const key in data) {
      if (key !== 'total') {
        const value = data[key]
        const dataPoint = { label: key, y: value }

        formattedData.push(dataPoint)
      }
    }

    this.trimEmptyEnds(formattedData)

    return formattedData;
  }

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

  //remove empty values on either end of the array
  private trimEmptyEnds(data: JSON[]): void {
    while (!data[data.length - 1]['y']) {
      data.pop()
    }

    while (!data[0]['y']) {
      data.shift()
    }
  }

}