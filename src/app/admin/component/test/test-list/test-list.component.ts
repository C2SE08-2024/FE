import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Test } from 'src/app/model/Test/test';
import { TestService } from 'src/app/service/test/test.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TestQuestionComponent } from '../../test-question/test-question-list/test-question.component';

@Component({
  selector: 'app-test-list',
  templateUrl: './test-list.component.html',
  styleUrls: ['./test-list.component.css']
})
export class TestListComponent implements OnInit {

  courseId : number;

  tests: Test[] = [];
  errorMessage: string;

  //phân trang
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  displayedItems: Test[]=[];
  
  constructor(private activeRoute: ActivatedRoute,
              private testService: TestService,
              private router: Router,
              private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    if (this.courseId) {
      this.loadTest();
    } else {
        this.courseId = +this.activeRoute.parent.snapshot.paramMap.get('id');
        if (this.courseId) {  
          this.loadTest();
        } else {
          console.error('Course ID is missing or invalid');
        }
      };
    }
  
  loadTest(): void {
    this.testService.getTestsByCourse(this.courseId).subscribe(
      (test) => {
        this.tests = test;
        this.totalItems = this.tests.length;
        this.displayedItems = this.getItemSlice();
        this.currentPage = 1;

      },
      (error) => {
        console.error('Error fetching tests:', error);
        this.errorMessage = 'Không thể tải danh sách bài học';
      }
    );
  }

  goToTestQuestionPage(testId: number) {
    this.router.navigate(['manage-binDev/course', this.courseId, 'test', testId,'test-question']);
    // this.router.navigate(['lesson',lessonId], { relativeTo: this.activeRoute });
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getItemSlice(): Test[] {
    const startIndex = (this.currentPage - 1 ) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.tests.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedItems = this.getItemSlice();
  }

}
