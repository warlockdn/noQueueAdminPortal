import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CouponMangerComponent } from './coupon-manger.component';

describe('CouponMangerComponent', () => {
  let component: CouponMangerComponent;
  let fixture: ComponentFixture<CouponMangerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CouponMangerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CouponMangerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
