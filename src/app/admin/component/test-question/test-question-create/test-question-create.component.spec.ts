import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestQuestionCreateComponent } from './test-question-create.component';

describe('TestQuestionCreateComponent', () => {
  let component: TestQuestionCreateComponent;
  let fixture: ComponentFixture<TestQuestionCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestQuestionCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestQuestionCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
