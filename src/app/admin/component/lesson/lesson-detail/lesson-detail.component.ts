import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Lesson } from 'src/app/model/Lesson/lesson';
import { Test } from 'src/app/model/Test/test';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TestService } from '../../../../service/test/test.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';

@Component({
  selector: 'app-lesson-detail',
  templateUrl: './lesson-detail.component.html',
  styleUrls: ['./lesson-detail.component.css']
})
export class LessonDetailComponent implements OnInit {

  @Input() lesson: Lesson;

  test: Test;
  testQuestions: TestQuestion[];
  errorMessage: string;
  course: Lesson[];
  testId: number;


  constructor(private activeRoute: ActivatedRoute,
              private lessonService: LessonService,
  ) { }

  ngOnInit(): void {
    if (this.lesson) {

    } else {
      const lessonId = +this.activeRoute.snapshot.paramMap.get('lessonId');
      console.log(lessonId);
      this.lessonService.getLessonByLessonId(lessonId).subscribe(
        (data) => {
          this.lesson = data;
        },
        (error) => {
          console.error('Error fetching course detail:', error);
        }
      );
    }
  }


}
