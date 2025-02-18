import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentTestResult } from 'src/app/model/Test/studentTestResult';
import { StudentService } from 'src/app/service/student/student.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-my-test',
  templateUrl: './my-test.component.html',
  styleUrls: ['./my-test.component.css']
})
export class MyTestComponent implements OnInit {

  StudentTestResult: StudentTestResult[] = [];
      isLoading = true;
      errorMessage = '';
      studentId: number;
    
      //phân trang
      totalItems: number = 0;
      itemsPerPage: number = 10;
      currentPage: number = 1;
      displayedItems: StudentTestResult[] = [];
    
    
      constructor(
                  private router: Router,
                  private activeRoute: ActivatedRoute,
                  private tokenStorageService: TokenStorageService,
                  private studentService: StudentService
  
      ) { }
    
      ngOnInit(): void {
         this.studentService.getStudentDetail().subscribe(
          data =>{
            this.studentId = data.studentId;
            if(this.studentId)
              this.loadCourses();
          }
        )
        
      }
    
      loadCourses(): void {
        if (this.tokenStorageService.getToken){
          this.studentService.getStudentDetail().subscribe(
            data=> {
              this.studentId = data.studentId;
              if(this.studentId){
                this.studentService.getStudentTestResults(this.studentId).subscribe(
                  data=>{
                    this.StudentTestResult = data;
                    this.totalItems = this.StudentTestResult.length;
                    this.isLoading = false;
                    this.displayedItems = this.getCourseSlice();
                    this.currentPage = 1;
                  }
                )
              }
            }
          )
        }   
      };
      
      goToCourseDetailPage(courseId: number): void {
        this.router.navigate(['/course', courseId,'detail']);
      }
    
      getPageArray(): number[] {
        const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
        return Array.from({ length: pageCount }, (_, i) => i + 1);
      }
    
      getCourseSlice(): StudentTestResult[] {
        const startIndex = (this.currentPage - 1) * this.itemsPerPage;
        const endIndex = startIndex + this.itemsPerPage;
        return this.StudentTestResult.slice(startIndex, endIndex);
      }
    
      changePage(page: number): void {
        console.log('Changing to page:', page);
        this.currentPage = page;
        this.displayedItems = this.getCourseSlice();
      }
    }
    
    