import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Category } from 'src/app/model/Category/category';
import { Course } from 'src/app/model/Course/course';
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.css']
})
export class CourseEditComponent implements OnInit {

  @Input() course: Course;
  editedCourse: Course;
  categoryList : Category[];
  uploadedAvatar: any;

  constructor(public activeModal: NgbActiveModal,
              // private categoryService: CategoryService,
              private courseService: CourseService) {}

  ngOnInit(): void {
    this.editedCourse = { ...this.course };
    // this.categoryService.getAll().subscribe(data =>{
    //   this.categoryList = data;
    // })
  }

  closeModal(): void {
    this.activeModal.close();
  }

  saveChanges(): void {
    this.courseService.updateCourse(this.editedCourse.courseId, this.editedCourse)
      .subscribe(updatedCourse => {
        console.log('Course updated:', updatedCourse);
        this.activeModal.close(this.editedCourse);
      });
  }

}
