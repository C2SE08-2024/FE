import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';  // Dịch vụ giỏ hàng
import { CourseService } from 'src/app/service/course/course.service';  // Dịch vụ khóa học
import { PaymentService } from 'src/app/service/payment/payment.service';  // Dịch vụ thanh toán

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  courseId: number = 0;  // ID khóa học
  course: any = {};  // Thông tin khóa học
  cartItems: any[] = [];  // Danh sách các khóa học trong giỏ
  totalAmount: number = 0;  // Tổng số tiền cần thanh toán
  loading: boolean = true;  // Trạng thái loading khi tải dữ liệu

  constructor(
    private cartService: CartService,
    private courseService: CourseService,  // Lấy thông tin khóa học
    private paymentService: PaymentService,  // Dịch vụ thanh toán
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.courseId = +this.route.snapshot.paramMap.get('id')!;  // Lấy khóa học ID từ URL
    this.loadCourseDetails(this.courseId);  // Lấy chi tiết khóa học
  }

  loadCourseDetails(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (data) => {
        this.course = data;
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi tải thông tin khóa học', error);
        this.loading = false;
      }
    );
  }

  proceedWithPayment(): void {
    const paymentData = {
      courseId: this.course.id,
      totalAmount: this.course.coursePrice,
      courseName: this.course.courseName,
      coursePrice: this.course.coursePrice
    };

    this.paymentService.createPayment(paymentData).subscribe(
      (response) => {
        // Chuyển hướng đến cổng thanh toán VNPAY
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl;  // Chuyển hướng tới VNPAY
        } else {
          console.error('Không nhận được URL thanh toán từ server');
        }
      },
      (error) => {
        console.error('Lỗi khi tạo thanh toán', error);
        alert('Có lỗi khi tạo thanh toán!');
      }
    );
  }
}
