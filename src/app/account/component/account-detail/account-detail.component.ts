import { Component, OnInit } from '@angular/core';
import { Instructor } from 'src/app/model/Account/Instructor';
import { Student } from 'src/app/model/Account/Student';
import { BusinessService } from 'src/app/service/business/business.service';
import { InstructorService } from 'src/app/service/instructor/instructor.service';
import { StudentService } from 'src/app/service/student/student.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { businessesData } from '../../../DATA';
import { Business } from 'src/app/model/Business/business';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.css']
})


export class AccountDetailComponent implements OnInit {
  isEditing: boolean = false;
  Item: any = {};
  isLoggedIn: boolean;
  role: any;
  username: any;
  businesses?: Business[];
  


  constructor(private tokenStorageService: TokenStorageService,
    private studentService: StudentService,
    private instructorService: InstructorService,
    private businessService: BusinessService
  ) { }

  ngOnInit(): void {
    this.loadPage();

  }


  loadPage(): void {
    if (this.tokenStorageService.getToken()) {
      this.role = this.tokenStorageService.getRole();
      if (this.tokenStorageService.getRole() === 'ROLE_STUDENT') {
        this.studentService.getStudentDetail().subscribe(
          (data) => {
            this.Item = data;
          })
      } else if (this.tokenStorageService.getRole() === 'ROLE_INSTRUCTOR') {
        this.instructorService.getInstructorDetail().subscribe(
          (data) => {
            this.Item = data
          })
      } else if (this.tokenStorageService.getRole() === 'ROLE_BUSINESS') {
        this.businessService.getBusinessUserDetail().subscribe(
          (data) => {
            this.Item = data
          })
      }
    }
  }

  toggleEdit(): void {
    if (this.isEditing) {
      // Khi bấm "Lưu", kiểm tra vai trò và gọi API tương ứng
      if (this.role === 'ROLE_STUDENT') {
        this.studentService.updateStudent(this.Item.studentId, this.Item).subscribe(
          (response) => {
            console.log('Thông tin học sinh đã được cập nhật:', response);
            this.isEditing = false;
          },
          (error) => {
            console.error('Lỗi khi cập nhật thông tin học sinh:', error);
          }
        );
      } else if (this.role === 'ROLE_INSTRUCTOR') {
        this.instructorService.updateInstructor(this.Item.instructorId, this.Item).subscribe(
          (response) => {
            console.log('Thông tin giảng viên đã được cập nhật:', response);
            this.isEditing = false;
          },
          (error) => {
            console.error('Lỗi khi cập nhật thông tin giảng viên:', error);
          }
        );
      } else if (this.role === 'ROLE_BUSINESS') {
        this.businessService.updateBusiness(this.Item.businessId, this.Item).subscribe(
          (response) => {
            console.log('Thông tin doanh nghiệp đã được cập nhật:', response);
            this.isEditing = false;
          },
          (error) => {
            console.error('Lỗi khi cập nhật thông tin doanh nghiệp:', error);
          }
        );
      }
    } else {
      // Chuyển sang chế độ chỉnh sửa
      this.isEditing = true;
    }
  }
}
