import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/Course/course';
import { CourseService } from 'src/app/service/course/course.service';
import { CourseDetailComponent } from '../course-detail/course-detail.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CourseEditComponent } from '../course-edit/course-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson } from '../../../../model/Lesson/lesson';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { TestService } from 'src/app/service/test/test.service';


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
  coursesPerPage: number = 10;
  currentPage: number = 1;
  displayedCourses: Course[]=[];
  

  constructor(private courseService: CourseService,
              private modalService: NgbModal,
              private router: Router,
              private activeRoute: ActivatedRoute,
              private lessonService: LessonService,
              private testService: TestService,
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

        this.courses.forEach((course) => {
          this.loadLessonsAndTests(course.courseId);
        });
    }),
      (error) => {
        console.error('Error fetching courses:', error);
        this.errorMessage = 'Không thể tải danh sách khóa học';
        this.isLoading = false;
      }
  };

  loadLessonsAndTests(courseId: number): void {
    // Lấy số lượng bài học
    this.lessonService.getLessonsByCourseId(courseId).subscribe(
      (lessons) => {
        const course = this.courses.find(c => c.courseId === courseId);
        if (course) {
          course.lessonCount = lessons.length;
        }
      },
      (error) => {
        console.error('Error fetching lessons:', error);
      }
    );

    // Lấy số lượng bài kiểm tra
    this.testService.getTestsByCourse(courseId).subscribe(
      (tests) => {
        const course = this.courses.find(c => c.courseId === courseId);
        if (course) {
          course.testCount = tests.length;
        }
      },
      (error) => {
        console.error('Error fetching tests:', error);
      }
    );
  }

  goToCourseDetailPage(courseId: number): void {
    // this.router.navigate(['manage-binDev/course', courseId]);
    this.router.navigate([courseId], { relativeTo: this.activeRoute });
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

