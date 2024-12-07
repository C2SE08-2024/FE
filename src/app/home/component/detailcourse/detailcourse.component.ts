import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { Course } from 'src/app/model/Course/course';  // Đảm bảo đường dẫn đúng
import { CourseService } from 'src/app/service/course/course.service';

@Component({
  selector: 'app-detailcourse',
  templateUrl: './detailcourse.component.html',
  styleUrls: ['./detailcourse.component.css'],
})
export class DetailcourseComponent implements OnInit {
  course: Course = {} as Course;
  loading: boolean = true;    // Biến trạng thái loading
  errorMessage: string = '';   // Biến lưu trữ thông báo lỗi

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    const courseId = +this.route.snapshot.paramMap.get('id')!;  // Lấy ID từ URL
    this.loadCourseDetail(courseId);  // Gọi hàm để lấy chi tiết khóa học
  }

  // Hàm tải chi tiết khóa học
  loadCourseDetail(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (data) => {
        this.course = data;
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Không thể tải thông tin khóa học!';
        this.loading = false;
      }
    );
  }
  registerCourse(): void {
    console.log('Đăng ký khóa học:', this.course?.courseName);
    alert('Bạn đã đăng ký khóa học thành công!');
    // Ở đây bạn có thể thêm logic gửi yêu cầu đăng ký đến backend
  }
}