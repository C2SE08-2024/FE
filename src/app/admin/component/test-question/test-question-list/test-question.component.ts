import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Test } from 'src/app/model/Test/test';
import { TestQuestion } from 'src/app/model/Test/test-question';
import { TestQuestionService } from 'src/app/service/test/test-question.service';
import { TestService } from 'src/app/service/test/test.service';
import { TestQuestionCreateComponent } from '../test-question-create/test-question-create.component';
import { TestQuestionEditComponent } from '../test-question-edit/test-question-edit.component';

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

  selectedIndex: number = 0;

  //xóa
  showDeletePopup = false;

  constructor(private testQuestionService: TestQuestionService,
              private activeRoute: ActivatedRoute,
              private testService: TestService,
              private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe(params => {
      this.courseId = +params.get('courseId');  
      this.testId = +params.get('testId');
      this.loadTest();      
      this.loadQuestions();  
    });
  }

  loadTest(): void {
    this.testService.getTestById(this.testId).subscribe(
      (data)=>{
        this.test = data;
      }
    )
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

  selectQuestion(question: TestQuestion, index: number): void {
    this.selectedQuestion = question;
    this.selectedIndex = index; 
  }

  openItemEditModal(): void {
    console.log(this.selectedQuestion);
      if (this.selectedQuestion) {
        const modalRef = this.modalService.open(TestQuestionEditComponent, {
          size: "lg",
        });
        modalRef.componentInstance.testQuestion = this.selectedQuestion;
      } else {
        alert("Chọn 1 câu hỏi");
      }
    }
  
    openItemCreateModal(): void {
      const modalRef = this.modalService.open(TestQuestionCreateComponent, {
        size: "lg",
      });
    }

    closeDeletePopup(): void {
      this.showDeletePopup = false;
      this.selectedIndex = null;
    }
  
    deleteItemAtId(): void {
      this.testQuestionService.deleteTestQuestion(this.selectedIndex)
        .subscribe(() => {
          console.log('Item deleted successfully');
          this.closeDeletePopup();
          this.loadQuestions();
        }, error => {
          console.error('Error deleting Item:', error);
        });
    }

    confirmDelete(id: number): void {
      this.showDeletePopup = true;
    }

  convertToHtml(text: string): string {
    return text ? text.replace(/\n/g, '<br>') : '';
  }
}

