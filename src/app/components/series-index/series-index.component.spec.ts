import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriesIndexComponent } from './series-index.component';

describe('SeriesIndexComponent', () => {
  let component: SeriesIndexComponent;
  let fixture: ComponentFixture<SeriesIndexComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriesIndexComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriesIndexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
