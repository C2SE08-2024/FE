import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDetailComponent } from 'src/app/business/component/job/job-detail/job-detail.component';
import { JobDTO } from 'src/app/model/Job/job';
import { BusinessService } from 'src/app/service/business/business.service';
import { JobService } from 'src/app/service/job/job.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

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
      this.loadJob();
    }
  
    loadJob(): void {
      this.jobService.getAllJobs().subscribe((data) => {
        this.jobs = data;
      });
    }
  
    openJobDetailModal(job: JobDTO): void {
      const modalRef = this.modalService.open(JobDetailComponent, {
        size: "lg",
      });
      modalRef.componentInstance.job = job;
    }

}
