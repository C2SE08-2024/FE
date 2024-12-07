import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment/payment.service';

@Component({
  selector: 'app-paymentdetail',
  templateUrl: './paymentdetail.component.html',
  styleUrls: ['./paymentdetail.component.css']
})
export class PaymentdetailComponent implements OnInit {

  payment: any;
  loading = false;
  errorMessage: string = '';

  constructor(private route: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router) { }

  ngOnInit(): void {
    const cartId = +this.route.snapshot.paramMap.get('cartId')!;
    this.loading = true;
    this.paymentService.getPaymentDetails(cartId).subscribe({
      next: (data) => {
        this.payment = data;
        this.loading = false;
      },
      error: (err) => {
        this.errorMessage = "Không thể lấy chi tiết thanh toán.";
        this.loading = false;
      }
    });
  }

  payNow() {
    // Chuyển người dùng đến trang thanh toán của VNPay
    const paymentUrl = this.payment.url;
    window.location.href = paymentUrl;
  }
}
