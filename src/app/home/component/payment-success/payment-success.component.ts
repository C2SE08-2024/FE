import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentService } from 'src/app/service/payment/payment.service';

@Component({
  selector: 'app-payment-success',
  templateUrl: './payment-success.component.html',
  styleUrls: ['./payment-success.component.css']
})
export class PaymentSuccessComponent implements OnInit {
  totalAmount: number;
  txnRef: string;
  status: string;

  constructor(private activatedRoute: ActivatedRoute,
              private paymentService: PaymentService,
              private router: Router) { 
    this.activatedRoute.queryParams.subscribe(params => {
      this.totalAmount = params['vnp_Amount'];
      this.txnRef = params['vnp_TxnRef'];
      this.status = params['vnp_TransactionStatus'];
      let message: string;
      if (this.status == '00') {
        this.paymentService.transactionSuccess(this.txnRef).subscribe();
        message = 'Thanh toán thành công'
      } else {
        this.paymentService.transactionFail(this.txnRef).subscribe();
        message = 'Thanh toán thất bại'
      }
      this.alertAndNavigate(message);
    });
  }

  ngOnInit(): void {
    
  }

  alertAndNavigate(message: string) {
    alert(message);
    this.router.navigateByUrl('');
  }
}
