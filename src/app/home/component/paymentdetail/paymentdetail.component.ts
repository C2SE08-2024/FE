import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/service/cart/cart.service';
import { PaymentService } from 'src/app/service/payment/payment.service';
import { CartDetail } from 'src/app/model/DTO/cart-detail';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.css']
})
export class PaymentdetailComponent implements OnInit {
  cartId: number = 0; 
  cartDetails: CartDetail[];
  totalAmount: number = 0; 
  loading: boolean = true; 
  paymentMethod = 'direct'; 
  
  constructor(private route: ActivatedRoute,
              private cartService: CartService,
              private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.cartId = +this.route.snapshot.paramMap.get('cartId')!; // Lấy ID giỏ hàng từ URL
    this.loadCartDetails(); 
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

  // proceedToPayment(): void {
  //   if (!this.cartDetails.length) {
  //     alert('Không có sản phẩm nào trong giỏ hàng để thanh toán.');
  //     return;
  //   }
  
  //   const paymentData = {
  //     cart: {
  //       cartId: this.cartId,
  //       receiverName: this.receiverName,
  //       receiverAddress: this.receiverAddress,
  //       receiverPhone: this.receiverPhone,
  //       receiverEmail: this.receiverEmail
  //     },
  //     cartDetailList: this.cartDetails
  //   };

  //   console.log('Sending payment data:', paymentData);
  
  //   this.paymentService.getPaid(paymentData).subscribe(
  //     (response) => {
  //       if (response && response.url) {
  //         window.location.href = response.url; // Chuyển hướng đến URL thanh toán
  //       } else {
  //         alert('Lỗi khi tạo thanh toán. Vui lòng thử lại.');
  //       }
  //     },
  //     (error) => {
  //       console.error('Lỗi khi thanh toán:', error);
  //       alert('Thanh toán không thành công, vui lòng thử lại.');
  //     }
  //   );
  // }
}  
