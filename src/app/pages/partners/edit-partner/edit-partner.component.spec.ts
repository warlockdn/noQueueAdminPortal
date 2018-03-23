import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditPartnerComponent } from './edit-partner.component';

describe('EditPartnerComponent', () => {
  let component: EditPartnerComponent;
  let fixture: ComponentFixture<EditPartnerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditPartnerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditPartnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
