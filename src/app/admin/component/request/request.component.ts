import { Component, OnInit } from '@angular/core';
import { Business } from 'src/app/model/Business/business';
import { BusinessService } from 'src/app/service/business/business.service';
import { RequestService } from 'src/app/service/request/request.service';
import { StudentService } from 'src/app/service/student/student.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { Request } from 'src/app/model/Request/request';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {


  userId: number;
  role: string;
  requestList: Request[] = [];
  errorMessage: string;

  totalItems: number = 0;
  itemsPerPage: number = 10;
  currentPage: number = 1;
  displayedItems: Request[] = [];


  constructor(private requestService: RequestService,
    private businessService: BusinessService,
    private tokenStorageService: TokenStorageService,
    private studentService: StudentService
  ) { }

  ngOnInit(): void {
    this.role = this.tokenStorageService.getRole();
    if (this.role)
      if (this.role === "ROLE_STUDENT") {
        this.studentService.getStudentDetail().subscribe(
          data => {
            this.userId = data.studentId;
            this.loadRequestsByStudentId();
          }
        )
      } else if (this.role === "ROLE_BUSINESS") {
        this.businessService.getBusinessUserDetail().subscribe(
          data => {
            this.userId = data.businessId;
            this.loadRequestsByBusinessId();
          }
        )
      }
  }

  loadRequestsByStudentId(): void {
    this.requestService.getRequestsByStudent(this.userId).subscribe(
      data => {
        this.requestList = data;
        this.totalItems = this.requestList.length;
        this.displayedItems = this.getItemSlice();
        this.currentPage = 1;
      }
    )
  }

  loadRequestsByBusinessId(): void {
    this.requestService.getRequestsByBusiness(this.userId).subscribe(
      data => {
        this.requestList = data;
      }
    )
  }

  acceptRequest(requestId: number): void {
    this.requestService.acceptRequest(requestId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error accepting request:', error);
        this.errorMessage = 'Error accepting request'
      }
    );
  }

  rejectRequest(requestId: number): void {
    this.requestService.rejectRequest(requestId).subscribe(
      response => {
        console.log(response);
      },
      error => {
        console.error('Error rejecting request:', error);
        this.errorMessage = 'Error rejecting request:'
      }
    );
  }

  getPageArray(): number[] {
      const pageCount = Math.ceil(this.totalItems / this.itemsPerPage);
      return Array.from({ length: pageCount }, (_, i) => i + 1);
    }
  
    getItemSlice(): Request[] {
      const startIndex = (this.currentPage - 1 ) * this.itemsPerPage;
      const endIndex = startIndex + this.itemsPerPage;
      return this.requestList.slice(startIndex, endIndex);
    }
  
    changePage(page: number): void {
      console.log('Changing to page:', page);
      this.currentPage = page;
      this.displayedItems = this.getItemSlice();
    }
}