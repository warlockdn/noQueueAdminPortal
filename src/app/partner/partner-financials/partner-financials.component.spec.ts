import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PartnerFinancialsComponent } from './partner-financials.component';

describe('PartnerFinancialsComponent', () => {
  let component: PartnerFinancialsComponent;
  let fixture: ComponentFixture<PartnerFinancialsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PartnerFinancialsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PartnerFinancialsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
