import { TestBed } from '@angular/core/testing';

import { GoldAndSilverPricesService } from './gold-and-silver-prices.service';

describe('GoldAndSilverPricesService', () => {
  let service: GoldAndSilverPricesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoldAndSilverPricesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
