import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeeCourseComponent } from './fee-course.component';

describe('FeeCourseComponent', () => {
  let component: FeeCourseComponent;
  let fixture: ComponentFixture<FeeCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeeCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeeCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
