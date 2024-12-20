import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/model/Course/course';  // Đảm bảo đường dẫn đúng
import { CourseService } from 'src/app/service/course/course.service';
import { PaymentService } from 'src/app/service/payment/payment.service';  // Thêm PaymentService
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { CartService } from 'src/app/service/cart/cart.service';

@Component({
  selector: 'app-detailcourse',
  templateUrl: './detailcourse.component.html',
  styleUrls: ['./detailcourse.component.css'],
})
export class DetailcourseComponent implements OnInit {
  course: Course = {} as Course;
  loading: boolean = true;    // Biến trạng thái loading
  errorMessage: string = '';   // Biến lưu trữ thông báo lỗi
  courseId: number;
  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private paymentService: PaymentService,
    private router: Router,
    private tokenStorageService: TokenStorageService,
    private cartService: CartService,
  ) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;  // Lấy ID từ URL
    console.log('Course ID:', this.courseId); // Thêm log để kiểm tra ID
    this.checkRegistrationStatus(); // Kiểm tra trạng thái đăng ký
    this.loadCourseDetail(this.courseId); // Tải thông tin chi tiết khóa học
  }

  checkRegistrationStatus(): void {
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
  
    if (registeredCourses.includes(this.courseId)) {
      alert('Bạn đã đăng ký khóa học này. Điều hướng đến bài học.');
      this.router.navigate([`/course/${this.courseId}/lesson`]); // Điều hướng đến bài học
    }
  }
  
  
  isRegistered(): boolean {
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
    return registeredCourses.includes(this.courseId);
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
    if (this.course.coursePrice > 0) {
      // Khóa học trả phí - thêm vào giỏ hàng
      this.cartService.addToCart(this.courseId).subscribe(
        () => {
          const pendingCourses = JSON.parse(localStorage.getItem('pendingCourses') || '[]');
          if (!pendingCourses.includes(this.courseId)) {
            pendingCourses.push(this.courseId);
            localStorage.setItem('pendingCourses', JSON.stringify(pendingCourses));
          }
  
          alert('Bạn đã thêm khóa học vào giỏ hàng. Vui lòng thanh toán.');
          this.router.navigate(['/cart']); // Điều hướng đến giỏ hàng
        },
        (error) => {
          console.error('Lỗi khi thêm khóa học vào giỏ hàng:', error);
          alert('Không thể thêm khóa học vào giỏ hàng. Vui lòng thử lại!');
        }
      );
    } else {
      // Khóa học miễn phí - lưu trạng thái vào registeredCourses
      const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
      if (!registeredCourses.includes(this.courseId)) {
        registeredCourses.push(this.courseId);
        localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
      }
  
      alert('Bạn đã đăng ký khóa học miễn phí thành công!');
      this.router.navigate([`/course/${this.courseId}/lesson`]); // Điều hướng đến bài học
    }
  }
  
  
  
  

goToLesson(): void {
  this.router.navigate([`/course/${this.courseId}/lesson`]);
}

  
}