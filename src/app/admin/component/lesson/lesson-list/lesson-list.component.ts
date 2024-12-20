import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Lesson, mapLessonToLessonDTO } from 'src/app/model/Lesson/lesson';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LessonDetailComponent } from '../lesson-detail/lesson-detail.component';
import { LessonEditComponent } from '../lesson-edit/lesson-edit.component';
import { LessonCreateComponent } from '../lesson-create/lesson-create.component';

@Component({
  selector: "app-lesson-list",
  templateUrl: "./lesson-list.component.html",
  styleUrls: ["./lesson-list.component.css"],
})
export class LessonListComponent implements OnInit {
  courseId: number;

  lessons: Lesson[] = [];
  errorMessage: string;

  //phân trang
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  displayedItems: Lesson[] = [];

  constructor(
    private activeRoute: ActivatedRoute,
    private lessonService: LessonService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    if (this.courseId) {
      this.loadLesson();
    } else {
      this.courseId = +this.activeRoute.parent.snapshot.paramMap.get("id");
      if (this.courseId) {
        this.loadLesson();
      } else {
        console.error("Course ID is missing or invalid");
      }
    }
  }

  loadLesson(): void {
    this.lessonService.getLessonsByCourseId(this.courseId).subscribe(
      (lesson) => {
        this.lessons = lesson;
        this.totalItems = this.lessons.length;
        this.displayedItems = this.getItemSlice();
        this.currentPage = 1;
      },
      (error) => {
        console.error("Error fetching tests:", error);
        this.errorMessage = "Không thể tải danh sách bài học";
      }
    );
  }

  goToLessonDetailPage(lessonId: number) {
    this.router.navigate(["manage-binDev/course", this.courseId, "lesson", lessonId,]);
    // this.router.navigate(['lesson',lessonId], { relativeTo: this.activeRoute });
  }

  goToLessonCreatePage() {
    this.router.navigate(["manage-binDev/course", this.courseId, "lesson","create" ]);
  }

  openLessonDetailModal(lesson: Lesson): void {
    const modalRef = this.modalService.open(LessonDetailComponent, {
      size: "lg",
    });
    modalRef.componentInstance.lesson = lesson;
  }  
  

  openLessonEditModal(lesson: Lesson): void {
    const lessonDTO = mapLessonToLessonDTO(lesson);
    const modalRef = this.modalService.open(LessonEditComponent, {
      size: "lg",
    });
    modalRef.componentInstance.lessonDTO = lessonDTO;
    modalRef.result.then(
      (result) => {
        console.log("Edit successful:", result);
      },
      (reason) => {
        console.log("Fail to edit:", reason);
      }
    );
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getItemSlice(): Lesson[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.lessons.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log("Changing to page:", page);
    this.currentPage = page;
    this.displayedItems = this.getItemSlice();
  }
}
