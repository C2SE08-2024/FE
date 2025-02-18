import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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
  uploadedAvatar: any;

  constructor(public activeModal: NgbActiveModal,
              private courseService: CourseService) {}

  ngOnInit(): void {
    this.editedCourse = { ...this.course };
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
