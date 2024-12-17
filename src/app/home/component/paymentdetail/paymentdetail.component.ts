import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { PaymentService } from 'src/app/service/payment/payment.service';
import { CartDetail } from 'src/app/model/DTO/cart-detail.model';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.css']
})
export class PaymentdetailComponent implements OnInit {
  cartId: number = 0; // ID giỏ hàng
  cartDetails: CartDetail[] = []; // Danh sách chi tiết giỏ hàng
  totalAmount: number = 0; // Tổng tiền của các khóa học
  loading: boolean = true; // Trạng thái loading
  receiverName: '';
  receiverAddress: '';
  receiverEmail: '';
  
  constructor(
    private route: ActivatedRoute,
    private cartService: CartService,
    private paymentService: PaymentService
  ) {}

  ngOnInit(): void {
    this.cartId = +this.route.snapshot.paramMap.get('cartId')!; // Lấy ID giỏ hàng từ URL
    this.loadCartDetails(); // Tải thông tin chi tiết giỏ hàng
  }

  // Tải thông tin chi tiết giỏ hàng từ backend
  loadCartDetails(): void {
    this.cartService.getCart().subscribe(
      (data) => {
        this.cartDetails = data.cartDetailList || []; // Gán danh sách hoặc giữ mảng rỗng
        this.totalAmount = this.calculateTotal(); // Tính tổng tiền
        this.loading = false; // Dừng trạng thái loading
      },
      (error) => {
        console.error('Lỗi khi tải chi tiết giỏ hàng:', error);
        this.cartDetails = []; // Đảm bảo không bị undefined
        this.loading = false;
      }
    );
  }
  

  // Tính tổng tiền của giỏ hàng
  calculateTotal(): number {
    if (!this.cartDetails) return 0;
    return this.cartDetails.reduce((sum, item) => sum + item.course.coursePrice, 0);
  }

  // Xử lý thanh toán qua PaymentService
  proceedToPayment(): void {
    if (!this.cartId || !this.cartDetails.length) {
      alert('Không có sản phẩm nào trong giỏ hàng để thanh toán.');
      return;
    }
  
    const paymentData = {
      cart: {
        cartId: this.cartId,
        receiverName: this.receiverName,
        receiverAddress: this.receiverAddress,
        receiverPhone: this.receiverName,
        receiverEmail: this.receiverEmail
      },
      cartDetailList: this.cartDetails.map((item) => ({
        cartDetailId: item.cartDetailId,
        course: {
          id: item.course.id,
          coursePrice: item.course.coursePrice
        },
        status: item.status
      }))
    };
  
    this.paymentService.createPayment(paymentData).subscribe(
      (response) => {
        if (response && response.url) {
          // Chuyển hướng tới URL thanh toán từ backend
          window.location.href = response.url;
        } else {
          console.error('Không nhận được URL thanh toán từ server');
          alert('Có lỗi xảy ra, vui lòng thử lại!');
        }
      },
      (error) => {
        console.error('Lỗi khi tạo thanh toán:', error);
        alert('Có lỗi xảy ra, vui lòng thử lại!');
      }
    );
  }
}  
