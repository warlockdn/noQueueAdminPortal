import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FinanceAnalyticsComponent } from './finance-analytics.component';

describe('FinanceAnalyticsComponent', () => {
  let component: FinanceAnalyticsComponent;
  let fixture: ComponentFixture<FinanceAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FinanceAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FinanceAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
