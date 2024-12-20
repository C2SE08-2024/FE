import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Instructor } from 'src/app/model/Account/Instructor';
import { InstructorService } from 'src/app/service/instructor/instructor.service';

@Component({
  selector: 'app-instructor-list',
  templateUrl: './instructor-list.component.html',
  styleUrls: ['./instructor-list.component.css']
})
export class InstructorListComponent implements OnInit {

  instructors: Instructor[] = [];
    errorMessage: string;
  
    //phân trang
    totalItems: number = 0;
    itemsPerPage: number = 10;
    currentPage: number = 1;
    displayedItems: Instructor[] = [];
  
    constructor(private activeRoute: ActivatedRoute,
                private instructorService: InstructorService,
                private router: Router,
                private modalService: NgbModal
    ) {}
  
    ngOnInit(): void {
      this.loadItem();
    }
  
    loadItem(): void {
      this.instructorService.getAllInstructors().subscribe(
        (data) => {
          this.instructors = data;
          this.totalItems = this.instructors.length;
          this.displayedItems = this.getItemSlice();
          this.currentPage = 1;
        },
        (error) => {
          console.error("Error fetching tests:", error);
          this.errorMessage = "Không thể tải danh sách giảng viên";
        }
      );
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
  
    getItemSlice(): Instructor[] {
      const startIndex = (this.currentPage - 1) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.instructors.slice(startIndex, endIndex);
    }
  
    changePage(page: number): void {
      console.log("Changing to page:", page);
      this.currentPage = page;
      this.displayedItems = this.getItemSlice();
    }
  }
    