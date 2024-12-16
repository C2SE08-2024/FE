import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { Course } from 'src/app/model/Course/course';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.css']
})
export class CourseDetailComponent implements OnInit {

  @Input() course: Course;

  constructor( public activeModal: NgbActiveModal) {}

  closeModal(): void {
    this.activeModal.close();
  }
  ngOnInit(): void {
  }

}
