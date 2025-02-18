import { Component, Input, OnInit } from '@angular/core';
import { TestQuestion } from '../../../model/Test/test-question';
import { ActivatedRoute } from '@angular/router';
import { TestQuestionService } from 'src/app/service/test/test-question.service';
import { TestService } from 'src/app/service/test/test.service';
import { Test } from 'src/app/model/Test/test';
import { SubmitTestDTO } from 'src/app/model/Test/submitTest';
import { StudentTestResultService } from 'src/app/service/test/student-test-result.service';

@Component({
  selector: 'app-test-detail',
  templateUrl: './test-detail.component.html',
  styleUrls: ['./test-detail.component.css']
})
export class TestDetailComponent implements OnInit {

  @Input() testId: number;
  questions: TestQuestion[] = [];
  test: Test;
  courseId: number;
  submitTest: SubmitTestDTO = { testId: 0, answers: [] };;
  answers: string[] = [];

  constructor(private testQuestionService: TestQuestionService,
    private activeRoute: ActivatedRoute,
    private testService: TestService,
    private studentTestResultService: StudentTestResultService) { }

  ngOnInit(): void {

    this.activeRoute.paramMap.subscribe(params => {
      this.testId = +params.get('testId');
      if (this.testId) {
        this.loadTest();
        this.loadQuestions();
      }
    });

  }

  loadTest(): void {
    this.testService.getTestById(this.testId).subscribe(
      (data) => {
        this.test = data;
        this.submitTest.testId = data.testId;
      }
    )
  }

  loadQuestions(): void {
    this.testQuestionService.getQuestionsByTestId(this.testId).subscribe(
      (questions) => {
        this.questions = questions;
        this.answers = Array(questions.length).fill('');
      },
      (error) => {
        alert('Lỗi khi tải câu hỏi');
      }
    );
  }

  onSubmit(): void {
    const submitTestDTO: SubmitTestDTO = {
      testId: this.testId,
      answers: this.answers
    };

    this.studentTestResultService.submitTest(submitTestDTO).subscribe({
      next: (result) => {
        const status = result.isPassed ? 'Đậu' : 'Trượt';
        alert(`Gửi bài thành công. Điểm số: ${result.score}/100, Tình trạng: ${status}`);
      },
      error: (error) => {
        console.error('Error submitting test:', error);
        alert('Có lỗi xảy ra khi gửi bài làm');
      }
    });
  }

}
