import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/Course/course';
import { CourseService } from 'src/app/service/course/course.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseEditComponent } from '../course-edit/course-edit.component';
import { Router } from '@angular/router';


@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {

  courses: Course[] = [];
  isLoading = true;
  errorMessage = '';
  showDeletePopup = false;
  deleteCourseId: number;

  //phân trang
  totalCourses: number = 0;
  coursesPerPage: number = 5;
  currentPage: number = 1;
  displayedCourses: Course[]=[];
  

  constructor(private courseService: CourseService,
              private modalService: NgbModal,
              private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getAllCourses().subscribe(
      (data) => {
        this.courses = data;
        this.totalCourses = this.courses.length;
        this.isLoading = false;
        this.displayedCourses = this.getCourseSlice();
        this.currentPage = 1;
    }),
      (error) => {
        console.error('Error fetching courses:', error);
        this.errorMessage = 'Không thể tải danh sách khóa học';
        this.isLoading = false;
      }
  };

  goToCourseDetailPage(courseId: number): void {
    this.router.navigate(['manage-binDev/course', courseId]);
  }

  openCourseDetailModal(course: Course): void {
    const modalRef = this.modalService.open(CourseDetailComponent, {
      size: 'xl', 
    });
    modalRef.componentInstance.course = course; 
  }

  openCourseEditModal(course: Course): void {
    const modalRef = this.modalService.open(CourseEditComponent, {
      size: 'xl',
    });
    modalRef.componentInstance.course = course;
    modalRef.result.then((result) => {
      console.log('Edit successful:', result);
    }, (reason) => {
      console.log('Fail to edit:', reason);
    });
  }

  confirmDelete(id: number): void {
    this.showDeletePopup = true;
    this.deleteCourseId = id;
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.deleteCourseId = null;
  }

  deleteProductAtId(): void {
    this.courseService.deleteCourse(this.deleteCourseId)
      .subscribe(() => {
        console.log('Product deleted successfully');
        this.closeDeletePopup();
        this.loadCourses();
      }, error => {
        console.error('Error deleting Product:', error);
      });
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalCourses / this.coursesPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getCourseSlice(): Course[] {
    const startIndex = (this.currentPage - 1 ) * this.coursesPerPage;
    const endIndex = startIndex + this.coursesPerPage;
    return this.courses.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedCourses = this.getCourseSlice();
  }
}

