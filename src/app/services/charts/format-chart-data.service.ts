import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class FormatChartDataService {
  constructor() { }

  format(data) {
    const formattedData = []

    for (const key in data) {
      if (key && key !== 'total') {
        const value = data[key] || 0

        const dataPoint = { label: key, y: value }

        formattedData.push(dataPoint)
      }
    }

    this.trimEmptyEnds(formattedData)

    return formattedData;
  };

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