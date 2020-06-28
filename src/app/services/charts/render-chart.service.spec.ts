import { TestBed } from '@angular/core/testing';

import { RenderChartService } from './render-chart.service';

describe('RenderChartService', () => {
  let service: RenderChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RenderChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
