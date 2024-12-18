import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { PaymentService } from 'src/app/service/payment/payment.service';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.css']
})
export class PaymentdetailComponent implements OnInit {
  cartId: number = 0;  // ID giỏ hàng
  cartItems: any[] = [];  // Các khóa học trong giỏ hàng
  totalAmount: number = 0; // Tổng tiền của các khóa học
  loading: boolean = true; // Trạng thái loading

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.cartId = +this.route.snapshot.paramMap.get('cartId')!;  // Lấy ID giỏ hàng từ URL
    this.loadCartDetails(this.cartId);  // Tải thông tin giỏ hàng
  }

  loadCartDetails(cartId: number): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cartItems = data.cartDetailList;
        this.totalAmount = this.cartItems.reduce((sum, item) => sum + item.course.coursePrice, 0);  // Tính tổng tiền
        this.loading = false;
      },
      (error) => {
        console.error('Lỗi khi tải chi tiết giỏ hàng', error);
        this.loading = false;
      }
    );
  }

  proceedToPayment(): void {
    const paymentData = {
      cartId: this.cartId,
      totalAmount: this.totalAmount,
      cartItems: this.cartItems.map(item => ({
        courseId: item.course.id,
        coursePrice: item.course.coursePrice
      }))
    };

    this.paymentService.createPayment(paymentData).subscribe(
      (response) => {
        if (response && response.paymentUrl) {
          window.location.href = response.paymentUrl;  // Chuyển hướng tới cổng thanh toán VNPAY
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
