import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css']
})
export class ContactUsComponent implements OnInit {
  contact = {
    name: '',
    email: '',
    phone: '',
    message: ''
  };
  onSubmit() {
    console.log('Thông tin liên hệ:', this.contact);
    alert('Tin nhắn của bạn đã được gửi thành công!');
    this.contact = {
      name: '',
      email: '',
      phone: '',
      message: ''
    };
  }
  constructor() { }

  ngOnInit(): void {
  }

}
