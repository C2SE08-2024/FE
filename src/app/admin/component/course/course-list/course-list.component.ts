import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/Course/course';
import { CourseService } from 'src/app/service/course/course.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseEditComponent } from '../course-edit/course-edit.component';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private courseService: CourseService,
              private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        this.isLoading = false;
    }),
      (error) => {
        console.error('Error fetching courses:', error);
        this.errorMessage = 'Không thể tải danh sách khóa học';
        this.isLoading = false;
      }
  };

  openCourseDetailModal(course: Course): void {
    const modalRef = this.modalService.open(CourseDetailComponent, {
      size: 'lg', 
    });
    modalRef.componentInstance.course = course; 
  }

  openCourseEditModal(course: Course): void {
    const modalRef = this.modalService.open(CourseEditComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.course = course;
    modalRef.result.then((result) => {
      console.log('Edit successful:', result);
    }, (reason) => {
      console.log('Fail to edit:', reason);
    });
  }
}

