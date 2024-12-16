import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/Course/course';
import { Lesson } from 'src/app/model/Lesson/lesson';
import { Test } from 'src/app/model/Test/test';
import { CourseService } from 'src/app/service/course/course.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { TestService } from 'src/app/service/test/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonDetailComponent } from '../../lesson/lesson-detail/lesson-detail.component';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  @Input() course: Course;
  lessons: Lesson[] = [];
  tests: Test[] = [];
  selectedTest: Test;
  errorMessage: string;
  courseId: number

  //phân trang
  totalLessons: number = 0;
  lessonsPerPage: number = 10;
  currentPage: number = 1;
  displayedLessons: Lesson[]=[];

  showTestDetails: { [key: number]: boolean } = {};

  constructor(private courseService: CourseService,
              private testService: TestService,
              private activeRoute: ActivatedRoute,
              private router: Router,
              private lessonService: LessonService,
              private modalService: NgbModal,
  ) {}

  ngOnInit(): void {
    if (this.course) {
      this.loadLesson();
      this.loadTests();
    } else {
      this.activeRoute.paramMap.subscribe(params => {
        this.courseId = Number(params.get('id'));
        if (this.courseId) {  
          this.courseService.getCourseById(this.courseId).subscribe(
            (data) => {
              this.course = data;
              this.loadLesson();
              this.loadTests();
            },
            (error) => {
              console.error('Error fetching course detail:', error);
            }
          );
        } else {
          console.error('Course ID is missing or invalid');
        }
      });
    }
  }
  
  loadLesson(): void {
    this.lessonService.getLessonsByCourseId(this.course.courseId).subscribe(
      (lesson) => {
        this.lessons = lesson;
        this.totalLessons = this.lessons.length;
        this.displayedLessons = this.getLessonSlice();
        this.currentPage = 1;
        // Khởi tạo trạng thái hiển thị test là false cho mỗi bài học
        this.lessons.forEach((lesson, index) => {
          this.showTestDetails[index] = false; 
        });
      },
      (error) => {
        console.error('Error fetching tests:', error);
        this.errorMessage = 'Không thể tải danh sách bài học';
      }
    );
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

  toggleTestDetails(index: number): void {
    // Lật trạng thái hiển thị của bài kiểm tra
    this.showTestDetails[index] = !this.showTestDetails[index];
  }

  goToLessonDetailPage(lessonId: number) {
    this.router.navigate(['manage-binDev/course', this.course.courseId, 'lesson', lessonId]);
    // this.router.navigate(['lesson',lessonId], { relativeTo: this.activeRoute });
  }

  openLessonDetailModal(lesson: Lesson): void {
    const modalRef = this.modalService.open(LessonDetailComponent, {
      size: 'lg', 
    });
    modalRef.componentInstance.lesson = lesson; 
  }


  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalLessons / this.lessonsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getLessonSlice(): Lesson[] {
    const startIndex = (this.currentPage - 1 ) * this.lessonsPerPage;
    const endIndex = startIndex + this.lessonsPerPage;
    return this.lessons.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedLessons = this.getLessonSlice();
  }
}
