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
  courseId: number | null = null; // Khai báo courseId

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
    this.courseId = +this.activatedRoute.snapshot.queryParams['courseId'];
       // Lấy courseId từ query params
       this.courseId = +this.activatedRoute.snapshot.queryParams['courseId'];

       // Nếu không tìm thấy trong query params, lấy từ localStorage
       if (!this.courseId) {
         const pendingCourses = JSON.parse(localStorage.getItem('pendingCourses') || '[]');
         if (pendingCourses.length > 0) {
           this.courseId = pendingCourses[0]; // Giả sử chỉ có 1 khóa học chờ thanh toán
         }
       }
   
    
    
  }

  alertAndNavigate(message: string): void {
    const pendingCourses = JSON.parse(localStorage.getItem('pendingCourses') || '[]');
    const registeredCourses = JSON.parse(localStorage.getItem('registeredCourses') || '[]');
  
    // Xác định courseId từ pendingCourses
    const courseId = this.courseId || pendingCourses[0]; // Lấy courseId từ localStorage nếu cần
  
    if (courseId && !registeredCourses.includes(courseId)) {
      registeredCourses.push(courseId);
      localStorage.setItem('registeredCourses', JSON.stringify(registeredCourses));
  
      // Xóa khỏi pendingCourses
      const updatedPendingCourses = pendingCourses.filter((id: number) => id !== courseId);
      localStorage.setItem('pendingCourses', JSON.stringify(updatedPendingCourses));
    }
  
    alert(message);
    if (courseId) {
      this.router.navigate([`/course/${courseId}/lesson`]); // Điều hướng đến bài học
    } else {
      alert('Không tìm thấy khóa học. Vui lòng thử lại!');
      this.router.navigate(['/course']);
    }
  }
  

}
  
  
  
  

