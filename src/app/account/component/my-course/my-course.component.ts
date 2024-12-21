import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/Course/course';
import { InstructorUserDetailDto } from 'src/app/model/DTO/instructorUserDetailDto';
import { CourseService } from 'src/app/service/course/course.service';
import { StudentService } from 'src/app/service/student/student.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { SecurityModule } from '../../../security/security.module';

@Component({
  selector: 'app-my-course',
  templateUrl: './my-course.component.html',
  styleUrls: ['./my-course.component.css']
})
export class MyCourseComponent implements OnInit {

  courses: Course[] = [];
    isLoading = true;
    errorMessage = '';
    studentId: number;
  
    //phân trang
    totalCourses: number = 0;
    coursesPerPage: number = 10;
    currentPage: number = 1;
    displayedCourses: Course[] = [];
    instructor: InstructorUserDetailDto;
  
  
    constructor(private courseService: CourseService,
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
        if (this.tokenStorageService.getRole() === 'ROLE_STUDENT') {
          this.courseService.getCoursesByStudentId(this.studentId).subscribe(
            (data) => {
              this.courses = Array.from(data);
              this.totalCourses = this.courses.length;
              this.isLoading = false;
              this.displayedCourses = this.getCourseSlice();
              this.currentPage = 1;

            }),
            (error) => {
              console.error('Error fetching courses:', error);
              this.errorMessage = 'Không thể tải danh sách khóa học';
              this.isLoading = false;
            }
        } 
      }   
    };
    
    goToCourseDetailPage(courseId: number): void {
      this.router.navigate(['/course', courseId,'detail']);
    }
  
    getPageArray(): number[] {
      const pageCount = Math.ceil(this.totalCourses / this.coursesPerPage);
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
  
    getCourseSlice(): Course[] {
      const startIndex = (this.currentPage - 1) * this.coursesPerPage;
      const endIndex = startIndex + this.coursesPerPage;
      return this.courses.slice(startIndex, endIndex);
    }
  
    changePage(page: number): void {
      console.log('Changing to page:', page);
      this.currentPage = page;
      this.displayedCourses = this.getCourseSlice();
    }
  }
  
  