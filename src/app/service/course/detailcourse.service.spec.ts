import { TestBed } from '@angular/core/testing';

import { DetailcourseService } from './detailcourse.service';

describe('DetailcourseService', () => {
  let service: DetailcourseService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DetailcourseService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
