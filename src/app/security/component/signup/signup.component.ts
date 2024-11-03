import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor() { }

  onSubmit() {
    // Xử lý logic đăng ký ở đây
    alert('Đăng ký thành công!');
  }
  ngOnInit(): void {
  }

}
