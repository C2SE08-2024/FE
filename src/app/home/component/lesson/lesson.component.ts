import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/Course/course';
import { Test } from 'src/app/model/Test/test';
import { CourseService } from 'src/app/service/course/course.service';
import { LessonService } from 'src/app/service/lesson/lesson.service';
import { StudentService } from 'src/app/service/student/student.service';
import { TestService } from 'src/app/service/test/test.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.css']
})
export class LessonComponent implements OnInit {
  courseId: number;       
  studentId: number;  
  lessons: any[] = [];     
  errorMessage: string = '';
  selectedLesson: number | null = null;

  testList: Test[];

  course: Course[];
  

  constructor(
    private route: ActivatedRoute,
    private lessonService: LessonService,
    private courseService: CourseService,
    private studentService: StudentService,
    private router: Router,
    private testService: TestService,
  ) {}

  ngOnInit(): void {
    this.studentService.getStudentDetail().subscribe(
      data =>{
        this.studentId = data.studentId
        this.courseId = +this.route.snapshot.paramMap.get('id')!;
        if(this.studentId && this.courseId){
          this.courseService.getCoursesByStudentId(this.studentId).subscribe(
            (data =>{
              this.course = Array.from(data);
              const isRegistered = Array.from(this.course).some(course => course.courseId === this.courseId);
              if (!isRegistered) {
                alert('Bạn chưa đăng ký khóa học này. Vui lòng đăng ký trước!');
                this.router.navigate(['/course', this.courseId]); // Chuyển hướng về trang khóa học
                return;
              }
              // Nếu đã đăng ký, tải danh sách bài học
              this.loadLessons();
            })
          )
        }
      }
    )
  }

  loadLessons(): void {
    this.lessonService.getLessonsByCourseId(this.courseId).subscribe(
      (data) => {
        this.lessons = data;
      },
      (error) => {
        this.errorMessage = 'Không thể tải bài học, vui lòng thử lại sau!';
      }
    );
  }

  loadTests(): void {
    this.testService.getTestsByCourse(this.courseId).subscribe(
      data=>{
        this.testList = data;
      },
      (error) => {
        this.errorMessage = 'Không thể tải bài test, vui lòng thử lại sau!';
      }
    )
  }

  // isLessonUnlocked(index: number): boolean {
  //   if (index === 0) {
  //     return true; // Bài học đầu tiên luôn mở khóa
  //   }
  //   return this.lessons[index - 1]?.isCompletedByStudent; // Kiểm tra trạng thái của bài học trước
  // }

  startTest(testId: number): void {
    if (!testId) {
      alert('Không thể bắt đầu bài test. Dữ liệu bài test không hợp lệ.');
      return;
    }
    this.router.navigate(['test', testId]);
  }

  // markAsCompleted(lesson: any): void {
  //   if (!lesson) {
  //     console.error('Không thể đánh dấu bài học. Dữ liệu bài học không hợp lệ.');
  //     return;
  //   }
  //   lesson.isCompletedByStudent = true;
  //   this.lessonService.updateLessonStatus(lesson.id, true).subscribe(
  //     (response) => {
  //       console.log('Bài học đã được đánh dấu hoàn thành');
  //     },
  //     (error) => {
  //       console.error('Không thể cập nhật trạng thái bài học');
  //     }
  //   );
  // }
}
