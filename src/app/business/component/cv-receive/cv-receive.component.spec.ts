import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CVReceiveComponent } from './cv-receive.component';

describe('CVReceiveComponent', () => {
  let component: CVReceiveComponent;
  let fixture: ComponentFixture<CVReceiveComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CVReceiveComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CVReceiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
