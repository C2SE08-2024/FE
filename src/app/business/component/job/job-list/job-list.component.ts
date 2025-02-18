import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDTO } from 'src/app/model/Job/job';
import { BusinessService } from 'src/app/service/business/business.service';
import { JobService } from 'src/app/service/job/job.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { JobDetailComponent } from '../job-detail/job-detail.component';
import { JobEditComponent } from '../job-edit/job-edit.component';
import { JobCreateComponent } from '../job-create/job-create.component';

@Component({
  selector: "app-job-list",
  templateUrl: "./job-list.component.html",
  styleUrls: ["./job-list.component.css"],
})
export class JobListComponent implements OnInit {
  isLoggedIn = false;
  searchQuery = "";
  jobs: JobDTO[];
  selectedJob: JobDTO;
  role: any;
  username: string;
  businessId: number;
  selectedJobId: number = null;

  //xóa
  showDeletePopup = false;

  constructor(
    private router: Router,
    private businessService: BusinessService,
    private jobService: JobService,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadHeader();
  }

  viewDetails(jobId: number): void {
    this.router.navigate(["/my-business/job", jobId]);
  }

  loadHeader(): void {
    this.username = this.tokenStorageService.getUser();
    this.businessService.getBusinessUserDetail().subscribe((data) => {
      this.businessId = data.businessId;
      if (this.businessId) {
        this.loadJob();
      }
    });
  }

  loadJob(): void {
    this.jobService.getJobsByBusinessId(this.businessId).subscribe((data) => {
      this.jobs = data;
    });
  }

  selectJob(job: JobDTO) {
    this.selectedJobId = job.jobId;
    this.selectedJob = job;
  }

  openJobDetailModal(job: JobDTO): void {
    const modalRef = this.modalService.open(JobDetailComponent, {
      size: "lg",
    });
    modalRef.componentInstance.job = job;
  }

  openJobEditModal(): void {
    console.log(this.selectedJob);
    if (this.selectedJob) {
      const modalRef = this.modalService.open(JobEditComponent, {
        size: "lg",
      });
      modalRef.componentInstance.job = this.selectedJob;
    } else {
      alert("Chọn 1 bài tuyển dụng");
    }
  }

  openJobCreateModal(): void {
    const modalRef = this.modalService.open(JobCreateComponent, {
      size: "lg",
    });
  }

  closeDeletePopup(): void {
    this.showDeletePopup = false;
    this.selectedJobId = null;
  }

  deleteItemAtId(): void {
    this.jobService.deleteJob(this.selectedJobId)
      .subscribe(() => {
        console.log('Item deleted successfully');
        this.closeDeletePopup();
        this.loadJob();
      }, error => {
        console.error('Error deleting Item:', error);
      });
  }

  confirmDelete(id: number): void {
    this.showDeletePopup = true;
  }
}


