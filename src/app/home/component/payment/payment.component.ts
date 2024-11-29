import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  course: any;

  courses = [
    { id: 1, name: 'Machine Learning', description: 'Học Machine Learning với Python.', price: 5000000 },
    { id: 2, name: 'Data Science', description: 'Học Data Science toàn diện.', price: 4000000 },
    { id: 3, name: 'AI Nâng Cao', description: 'Khám phá công nghệ AI tiên tiến.', price: 6000000 },
  ];

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.course = this.courses.find(course => course.id === id);
  }

  processPayment(form: any) {
    alert(`Thanh toán thành công cho khóa học: ${this.course.name}`);
    console.log('Thông tin thanh toán:', form);
  }
}
