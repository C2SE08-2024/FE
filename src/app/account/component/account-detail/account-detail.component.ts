import { Component, OnInit } from '@angular/core';
import { Student } from 'src/app/model/Account/Student';
import { SignupRequest } from 'src/app/model/Request/SignupRequest';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})


export class AccountDetailComponent implements OnInit {
  student: Student = {
    studentId: 1,
    studentCode: 'S123456',
    studentName: 'John Doe',
    studentEmail: 'johndoe@example.com',
    studentPhone: '0987654321',
    studentGender: true, // true cho Nam, false cho Nữ (tùy theo cách bạn quy ước)
    dateOfBirth: new Date('2000-01-01'),
    idCard: '123456789012',
    studentAddress: '123 Main St, City, Country',
    studentImg: 'https://firebasestorage.googleapis.com/v0/b/capstone-1-398205.appspot.com/o/IMG%2Fstudent.jpg?alt=media&token=4b6571a2-1eea-4c15-940e-ffa391187ae3', 
    isEnable: true,
    major: 'Computer Science',
    graduationYear: 2024
  };

  constructor() { }

  ngOnInit(): void {
  }

}
