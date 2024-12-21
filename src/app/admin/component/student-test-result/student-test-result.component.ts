import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentTestResult } from 'src/app/model/Test/studentTestResult';
import { StudentTestResultService } from 'src/app/service/test/student-test-result.service';
import { TestService } from 'src/app/service/test/test.service';

@Component({
  selector: 'app-student-test-result',
  templateUrl: './student-test-result.component.html',
  styleUrls: ['./student-test-result.component.css']
})
export class StudentTestResultComponent implements OnInit {

  @Input() studentId: number;
  courseId: number;

  testResults: StudentTestResult [] = [];
  testResult: StudentTestResult;
  isLoading = true;


  errorMessage: string;

  //phân trang
  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  displayedItems: StudentTestResult[] = [];

  constructor(private activeRoute: ActivatedRoute,
              private testService: TestService,
              private router: Router,
              // private modalService: NgbModal,
              private studentTestResultService: StudentTestResultService,
  ) { }

  ngOnInit(): void {
    if (this.courseId) {

    } else {
      this.courseId = +this.activeRoute.parent.snapshot.paramMap.get('id');
      if (this.courseId) {

      } else {
        console.error('Course ID is missing or invalid');
      }
    };
  }

  getStudentTestResults(): void {
    // this.testService.getTestsByCourse(this.courseId).subscribe({
    //   next: (tests) => {
    //     // Lặp qua danh sách bài kiểm tra để lấy kết quả cho từng bài
    //     const requests = tests.map((test) =>
    //       this.studentTestResultService.getResultByStudentAndTest(this.studentId, test.testId).toPromise()
    //     );

    //     Promise.all(requests)
    //       .then((results) => {
    //         this.testResults = results.map((result, index) => ({
    //           testName: tests[index].testName, 
    //           score: result ? result.score : 'No result',
    //           isPassed: result ? result.isPassed : null,
    //           student: result?.student,
    //           test: tests[index],
    //         }));
    //         this.isLoading = false;
    //       })
    //       .catch((err) => {
    //         console.error('Error fetching test results:', err);
    //         this.isLoading = false;
    //       });
    //   },
    //   error: (err) => {
    //     console.error('Error fetching tests:', err);
    //     this.isLoading = false;
    //   }
    // });
    this.studentTestResultService.getResultByStudentAndTest(this.studentId, 1).subscribe(
      data =>{
        this.testResult = data;
      }
    )
  }

  goToTestQuestionPage(testId: number) {
    this.router.navigate(['manage-binDev/course', this.courseId, 'test', testId, 'test-question']);
    // this.router.navigate(['lesson',lessonId], { relativeTo: this.activeRoute });
  }

  getPageArray(): number[] {
    const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }

  getItemSlice(): StudentTestResult[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.testResults.slice(startIndex, endIndex);
  }

  changePage(page: number): void {
    console.log('Changing to page:', page);
    this.currentPage = page;
    this.displayedItems = this.getItemSlice();
  }

}
