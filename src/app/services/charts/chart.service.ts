import { Injectable } from '@angular/core';
import * as CanvasJS from '../../assets/canvasjs.min.js';
import { deepCopyObject } from '../../shared/functions';

@Injectable({
  providedIn: 'root'
})

export class ChartService {
  chart: CanvasJS;
  deepCopyObject: Function = deepCopyObject;
  
  constructor() { }

  format(data: JSON, prices?: JSON): Array<JSON> {
    const formattedData = []

    for (const key in data) {
      if (key !== 'total') {
        const value = data[key]
        const dataPoint = { label: key, y: value }

        //add prices as indexLabel if available
        if (prices && prices[key]) {
          dataPoint['indexLabel'] = `$${prices[key]}`
        }

        formattedData.push(dataPoint)
      }
    }

    this.trimEmptyEnds(formattedData)

    return formattedData;
  }

  renderChart(chartData: Array<JSON>, chartType: string = 'splineArea') {
    console.log(chartData)
    if (chartType.match(/pie|doughnut/)) {
      chartData = this.deepCopyDataAndRemoveIndexLabels(chartData);
    }
    this.chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      title: {
        text: "Rarity Curve"
      },
      data: [{
        type: chartType,
        dataPoints: chartData,
      }],
      axisY: {
        title: "Number of Coins",
        lineColor: 'silver'
      },
      axisX: {
        title: "Coin Grade"
      }
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

  private deepCopyDataAndRemoveIndexLabels(chartData: any) {
    const chartDataCopy = this.deepCopyObject(chartData)

    for (const object of chartDataCopy) {
      delete object['indexLabel']
    }

    return chartDataCopy
  }

}