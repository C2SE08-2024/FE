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
  this.loadCourseDetail(this.courseId);  // Gọi hàm để lấy chi tiết khóa học
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
      // Nếu khóa học có phí, thêm vào giỏ và chuyển đến trang giỏ hàng
      this.cartService.addCourseToCart(this.courseId).subscribe(
        (response) => {
          console.log('Khóa học đã được thêm vào giỏ hàng:', response); // Log thông tin thành công
          this.router.navigate(['/cart']); // Chuyển hướng đến trang giỏ hàng
        },
        (error) => {
          console.error('Lỗi khi thêm khóa học vào giỏ hàng:', error); // Log lỗi
          alert(`Có lỗi khi thêm khóa học vào giỏ hàng: ${error.message}`);
        }
      );
    } else {
      // Nếu khóa học miễn phí, hiển thị thông báo và chuyển sang lesson
      alert('Bạn đã đăng ký khóa học miễn phí thành công!');
      this.router.navigate([`/course/${this.courseId}/lesson`]);
    }
  }
  
}