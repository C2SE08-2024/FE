import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { Course } from 'src/app/model/Course/course';
import { Test } from 'src/app/model/Test/test';
import { CourseService } from 'src/app/service/course/course.service';
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

  constructor(private courseService: CourseService,
              private testService: TestService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              // public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    if (this.course) {
      this.loadTests();
    } else {
      const courseId = +this.activeRoute.snapshot.paramMap.get('id');
      this.courseService.getCourseById(courseId).subscribe(
        (data) => {
          //this.course = data;
          this.loadTests();
        },
        (error) => {
          console.error('Error fetching course detail:', error);
        }
      );
    }  
  }

  loadTests(): void {
    this.testService.getTestsByCourse(this.course.courseId).subscribe(
      (tests) => {
        this.tests = tests;
      },
      (error) => {
        console.error('Error fetching tests:', error);
        this.errorMessage = 'Không thể tải danh sách bài kiểm tra';
      }
    );
  }

  goToTestQuestion( testId: number): void {
    this.router.navigate(['manage-binDev/course', this.course.courseId, 'test', testId, 'test-question']);
  }
}
