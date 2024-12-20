import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TestQuestionService } from 'src/app/service/test/test-question.service';

@Component({
  selector: 'app-test-question-edit',
  templateUrl: './test-question-edit.component.html',
  styleUrls: ['./test-question-edit.component.css']
})
export class TestQuestionEditComponent implements OnInit {

  @Input() testQuestion: TestQuestion;
  editedQuestion: TestQuestion;

  constructor(public activeModal: NgbActiveModal,
    private testQuestionService: TestQuestionService) { }

  ngOnInit(): void {
    this.editedQuestion = { ...this.testQuestion };
  }

  closeModal(): void {
    this.activeModal.close();
  }

  saveChanges(): void {
    this.testQuestionService.updateTestQuestion(this.editedQuestion.questionId, this.editedQuestion)
      .subscribe(editedQuestion => {
        console.log('Course updated:', editedQuestion);
        this.activeModal.close(this.editedQuestion);
      });
  }

}
