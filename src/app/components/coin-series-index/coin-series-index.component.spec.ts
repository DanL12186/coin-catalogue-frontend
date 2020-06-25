import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinSeriesIndexComponent } from './coin-series-index.component';

describe('CoinSeriesIndexComponent', () => {
  let component: CoinSeriesIndexComponent;
  let fixture: ComponentFixture<CoinSeriesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CoinSeriesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CoinSeriesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
