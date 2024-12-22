import { TestBed } from '@angular/core/testing';

import { StudentCvService } from './student-cv.service';

describe('StudentCvService', () => {
  let service: StudentCvService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StudentCvService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
