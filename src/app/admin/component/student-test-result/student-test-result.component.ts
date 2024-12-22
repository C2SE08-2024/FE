import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentTestResult } from 'src/app/model/Test/studentTestResult';
import { CourseService } from 'src/app/service/course/course.service';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
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
  instructorId: number;
  coursesWithTestsAndResults: any[] = [];

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
              private courseService: CourseService,
              private instructorService: InstructorService,
              private studentTestResultService: StudentTestResultService,
  ) { }

  ngOnInit(): void {
    this.loadCourse();
  }

  loadCourse(): void {
    this.instructorService.getInstructorDetail().subscribe(
      data => {
        this.instructorId = data.instructorId; // Lấy instructorId hiện tại
        if (this.instructorId) {
          this.courseService.getAllCourses().subscribe(
            allCourses => {
              const filteredCourses = allCourses.filter(course => course.instructor?.instructorId === this.instructorId);
              console.log('Filtered Courses:', filteredCourses); // Kiểm tra danh sách đã lọc
  
              // Lấy bài test và kết quả học sinh cho từng khóa học
              filteredCourses.forEach(course => {
                this.testService.getTestsByCourse(course.courseId).subscribe(
                  tests => {
                    console.log(`Tests for course ${course.courseName}:`, tests);
  
                    const courseWithTests = { course, tests: [] };
  
                    // Lấy kết quả học sinh cho từng bài test
                    tests.forEach(test => {
                      this.studentTestResultService.getResultsByTestId(test.testId).subscribe(
                        results => {
                          console.log(`Results for test ${test.testName}:`, results);
                          courseWithTests.tests.push({ test, results });
  
                          if (!this.coursesWithTestsAndResults.some(c => c.course.courseId === course.courseId)) {
                            this.coursesWithTestsAndResults.push(courseWithTests);
                          }
                        },
                        error => {
                          console.error(`Error fetching results for test ${test.testName}:`, error);
                        }
                      );
                    });
                  },
                  error => {
                    console.error(`Error fetching tests for course ${course.courseName}:`, error);
                  }
                );
              });
            },
            error => {
              console.error('Error fetching courses:', error);
            }
          );
        }
      },
      error => {
        console.error('Error fetching instructor details:', error);
      }
    );
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
