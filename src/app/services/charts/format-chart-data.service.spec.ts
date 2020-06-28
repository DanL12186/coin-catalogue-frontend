import { TestBed } from '@angular/core/testing';

import { FormatChartDataService } from './format-chart-data.service';

describe('FormatChartDataService', () => {
  let service: FormatChartDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormatChartDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
