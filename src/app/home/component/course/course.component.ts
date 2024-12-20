import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/model/Course/course';
import { CourseService } from 'src/app/service/course/course.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-course', // Chọn selector phù hợp
  templateUrl: './course.component.html', // Đảm bảo đường dẫn đúng tới template
  styleUrls: ['./course.component.css'] // Đảm bảo đường dẫn đúng tới CSS
})
export class CourseComponent implements OnInit {

  freeCourses: any[] = [];  // Mảng chứa các khóa học miễn phí
  paidCourses: any[] = [];  // Mảng chứa các khóa học trả phí
  popularCourses: any[] = [];
  errorMessage: string = ''; // Biến để lưu thông báo lỗi
  loading: boolean;
  

  constructor(private courseService: CourseService,
              private router: Router,
  ) { }

  ngOnInit(): void {
    // Khi component được khởi tạo, gọi phương thức fetchCourses để lấy danh sách khóa học
    this.fetchFreeCourses();   // Lấy danh sách khóa học miễn phí
    this.fetchPaidCourses();   // Lấy danh sách khóa học trả phí
  }

  // Phương thức gọi API để lấy danh sách khóa học
  // Lấy danh sách khóa học miễn phí
  fetchFreeCourses(): void {
    this.loading = true;
    this.courseService.getFreeCourses().subscribe(
      (data) => {
        this.freeCourses = data;  // Lưu dữ liệu khóa học miễn phí vào mảng
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách khóa học miễn phí. Vui lòng thử lại sau!';
        this.loading = false;
      }
    );
  }

  // Lấy danh sách khóa học trả phí
  fetchPaidCourses(): void {
    this.loading = true;
    this.courseService.getPaidCourses().subscribe(
      (data) => {
        this.paidCourses = data;  // Lưu dữ liệu khóa học trả phí vào mảng
        this.loading = false;
      },
      (error) => {
        this.errorMessage = 'Không thể tải danh sách khóa học trả phí. Vui lòng thử lại sau!';
        this.loading = false;
      }
    );
    // Gọi API để lấy khóa học nổi bật
    this.courseService.getMostPopularCourses().subscribe(
      (data) => {
        this.popularCourses = data;
      },
      (error) => {
        this.errorMessage = 'Không thể tải khóa học nổi bật!';
      }
    );
  }


  // onImageError(event: any): void {
  //   console.log('Ảnh không tải được, sử dụng ảnh mặc định');
  //   event.target.src = 'assets/images/default-course-image.jpg'; // Đặt ảnh mặc    định khi ảnh gốc không tải được
  // }

  // Phương thức xử lý lỗi khi ảnh không tải được
  // onImageError(event: any): void {
  //   console.log('Ảnh không tải được, sử dụng ảnh mặc định');
  //   event.target.src = 'src/assets/images/default-course-image.jpg'; // Đặt ảnh mặc định khi ảnh gốc không tải được
  // }

  // Phương thức để chuyển hướng đến chi tiết khóa học
  goToDetail(courseId: number): void {
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
    if (registeredCourses.includes(courseId)) {
      this.router.navigate([`/course/${courseId}/lesson`]); // Điều hướng đến bài học nếu đã đăng ký
    } else {
      this.router.navigate([`/course/${courseId}`]); // Điều hướng đến trang chi tiết nếu chưa đăng ký
    }
  }
  

  isRegistered(courseId: number): boolean {
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
    return registeredCourses.includes(courseId);
  }

  getCourseStatus(courseId: number): string {
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
    const pendingCourses = JSON.parse(localStorage.getItem('pendingCourses') || '[]');
  
    if (registeredCourses.includes(courseId)) {
      return 'Tiếp tục học';
    } else if (pendingCourses.includes(courseId)) {
      return 'Thanh toán';
    } else {
      return 'Đăng ký ngay';
    }
  }
  
}
