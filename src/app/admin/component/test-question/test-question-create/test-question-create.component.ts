import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TestQuestionService } from 'src/app/service/test/test-question.service';

@Component({
  selector: 'app-test-question-create',
  templateUrl: './test-question-create.component.html',
  styleUrls: ['./test-question-create.component.css']
})
export class TestQuestionCreateComponent implements OnInit {

  testQuestion: TestQuestion;

  
    constructor(public activeModal: NgbActiveModal,
                private testQuestionService: TestQuestionService) {}
  
    ngOnInit(): void {

    }
  
    closeModal(): void {
      this.activeModal.close();
    }
  
    saveQuestion(): void {
      this.testQuestionService.addTestQuestion(this.testQuestion)
        .subscribe({
          next: (response) => {
            console.log('Question created successfully:', response);
            this.activeModal.close(response); 
          },
          error: (err) => {
            console.error('Error creating question:', err);
          }
        });
    }
  
  
  }
  