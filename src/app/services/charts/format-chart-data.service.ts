import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FormatChartDataService {
  constructor() { }

  columnFormat(data) {
    const formattedData = []

    for (const key in data) {
      if (key && key !== 'total') {
        const value = data[key] || 0

        const dataPoint = { label: key, y: value }
        
        formattedData.push(dataPoint)
      }
    }

    //remove last X number of grades without a value
    while (!formattedData[formattedData.length - 1].y) {
      formattedData.pop()
    }
    
    return formattedData;
  };

}