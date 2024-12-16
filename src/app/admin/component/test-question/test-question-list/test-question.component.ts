import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Test } from 'src/app/model/Test/test';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TestQuestionService } from 'src/app/service/test/test-question.service';
import { TestService } from 'src/app/service/test/test.service';

@Component({
  selector: 'app-test-question',
  templateUrl: './test-question.component.html',
  styleUrls: ['./test-question.component.css']
})
export class TestQuestionComponent implements OnInit {

  questions: TestQuestion[] = [];
  selectedQuestion: TestQuestion; 
  courseId: number;
  testId: number;
  test: Test;

  constructor(private testQuestionService: TestQuestionService,
              private activeRoute: ActivatedRoute,
              private testService: TestService,
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');  
      this.testId = +params.get('testId');      
      this.loadQuestions();  
    });
  }

  loadTest(): void {
    this.testService.getTestsByCourse
  }

  loadQuestions(): void {
    this.testQuestionService.getQuestionsByTestId(this.testId).subscribe( 
      (questions) => {
        this.questions = questions;
        if (this.questions && this.questions.length > 0) {
          this.selectedQuestion = this.questions[0];
        }
      },
      (error) => {
        console.error('Error fetching questions:', error);
      }
    );
  }

  selectQuestion(question: TestQuestion): void {
    this.selectedQuestion = question;
  }

  convertToHtml(text: string): string {
    return text ? text.replace(/\n/g, '<br>') : '';
  }
}

