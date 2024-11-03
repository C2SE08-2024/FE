import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor() { }

  onSubmit() {
    // Xử lý logic đăng nhập ở đây
    alert('Đăng nhập thành công!');
  }
  
  ngOnInit(): void {
  }

}
