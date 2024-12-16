import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BusinessdetailComponent } from './businessdetail.component';

describe('BusinessdetailComponent', () => {
  let component: BusinessdetailComponent;
  let fixture: ComponentFixture<BusinessdetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BusinessdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
