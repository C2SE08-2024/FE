import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Course } from 'src/app/model/Course/course';
import { Test } from 'src/app/model/Test/test';
import { TestService } from 'src/app/service/test/test.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  @Input() course: Course;
  tests: Test[] = [];
  errorMessage: string;

  constructor(public activeModal: NgbActiveModal,
              private testService: TestService,
  ) {}

  closeModal(): void {
    this.activeModal.close();
    this.loadTests();
  }
  ngOnInit(): void {
  }

  loadTests(): void {
    this.testService.getTestsByCourse(this.course.courseId).subscribe(
      (data) => {
        console.log('test',this.tests);
        this.tests = data;
      },
      (error) => {
        console.error('Error fetching tests:', error);
        this.errorMessage = 'Không thể tải danh sách bài kiểm tra';
      }
    );
  }

}
