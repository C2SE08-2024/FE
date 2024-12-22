import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job/job.service';
import { JobDTO } from 'src/app/model/Job/job';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { Router } from '@angular/router';
import { JobApplicationComponent } from '../job-application/job-application.component';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  jobs: JobDTO[] = [];
  searchTitle: string = '';
  isLoggedIn = false;

  constructor(
    private router: Router,
    private jobService: JobService,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    // Kiểm tra trạng thái đăng nhập
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (!this.isLoggedIn) {
      alert('Bạn cần đăng nhập để xem danh sách công việc.');
      this.router.navigate(['/login']); // Điều hướng đến trang đăng nhập nếu chưa đăng nhập
      return;
    }

    // Tải danh sách công việc nếu đã đăng nhập
    this.loadJobs();
  }

  // Tải tất cả công việc
  loadJobs(): void {
    this.jobService.getAllJobs().subscribe(
      (data: JobDTO[]) => {
        this.jobs = data;
      },
      (error) => {
        console.error('Error fetching jobs', error);
        alert('Không thể tải danh sách công việc. Vui lòng thử lại sau.');
      }
    );
  }

  // Tìm kiếm công việc
  searchJobs(): void {
    if (this.searchTitle) {
      this.jobService.searchJobsByTitle(this.searchTitle).subscribe(
        (data: JobDTO[]) => {
          this.jobs = data;
        },
        (error) => {
          console.error('Error searching jobs', error);
          alert('Không thể tìm kiếm công việc. Vui lòng thử lại sau.');
        }
      );
    } else {
      this.loadJobs();
    }
  }

  // Mở modal hiển thị chi tiết công việc
  openJobDetailModal(job: JobDTO): void {
    const modalRef = this.modalService.open(JobApplicationComponent, {
      size: 'lg',
    });
    modalRef.componentInstance.job = job; // Truyền thông tin công việc vào modal
  }
}
