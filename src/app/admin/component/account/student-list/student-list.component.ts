import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Student } from 'src/app/model/Account/Student';
import { StudentService } from 'src/app/service/student/student.service';

@Component({
  selector: "app-student-list",
  templateUrl: "./student-list.component.html",
  styleUrls: ["./student-list.component.css"],
})
export class StudentListComponent implements OnInit {

  students: any[] = [];
  errorMessage: string;
  courseId:number;

  //phân trang
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  displayedItems: Student[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private studentService: StudentService,
              private router: Router,
              private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem(): void {
    this.courseId = +this.activeRoute.parent.snapshot.paramMap.get("id"); 
    if (this.courseId) {
      // Gọi service lấy danh sách học viên theo khóa học
      this.studentService.getStudentsInCourse(Number(this.courseId)).subscribe(
        (data) => {
          this.students = data;
          this.totalItems = this.students.length;
          this.displayedItems = this.getItemSlice();
          this.currentPage = 1;
        },
        (error) => {
          console.error("Error fetching students by courseId:", error);
          this.errorMessage = "Không thể tải danh sách học viên theo khóa học";
        }
      );
    } else {
      // Gọi service lấy danh sách tất cả học viên
      this.studentService.getAllStudents().subscribe(
        (data) => {
          this.students = data;
          this.totalItems = this.students.length;
          this.displayedItems = this.getItemSlice();
          this.currentPage = 1;
        },
        (error) => {
          console.error("Error fetching tests:", error);
          this.errorMessage = "Không thể tải danh sách học viên";
        }
      );
    }
  }

  // goToLessonDetailPage(lessonId: number) {
  //   this.router.navigate([ "manage-binDev/course", this.courseId, "lesson", lessonId]);
  //   // this.router.navigate(['lesson',lessonId], { relativeTo: this.activeRoute });
  // }

  // goToLessonCreatePage() {
  //   this.router.navigate(["manage-binDev/course",this.courseId,"lesson","create"]);
  // }

  // openLessonDetailModal(student: Student): void {
  //   const modalRef = this.modalService.open(LessonDetailComponent, {
  //     size: "lg",
  //   });
  //   modalRef.componentInstance.lesson = student;
  // }

  // openLessonEditModal(student: Student): void {
  //   const modalRef = this.modalService.open(LessonEditComponent, {
  //     size: "lg",
  //   });
  //   modalRef.componentInstance.course = student;
  //   modalRef.result.then(
  //     (result) => {
  //       console.log("Edit successful:", result);
  //     },
  //     (reason) => {
  //       console.log("Fail to edit:", reason);
  //     }
  //   );
  // }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getItemSlice(): Student[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.students.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log("Changing to page:", page);
    this.currentPage = page;
    this.displayedItems = this.getItemSlice();
  }
}
  