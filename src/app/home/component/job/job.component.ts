import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/service/job/job.service';
import { JobDTO } from 'src/app/model/Job/job';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
import { BusinessService } from 'src/app/service/business/business.service';
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
    selectedJob: JobDTO;
    role: any;
    username: string;
    businessId: number;
    selectedJobId: number = null;
  
    //xóa
    showDeletePopup = false;

  constructor(private router: Router,
    private businessService: BusinessService,
    private jobService: JobService,
    private tokenStorageService: TokenStorageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    this.loadJobs();
  }

  loadJobs(): void {
    this.jobService.getAllJobs().subscribe(
      (data: JobDTO[]) => {
        this.jobs = data;
      },
      (error) => {
        console.error('Error fetching jobs', error);
      }
    );
  }

  searchJobs(): void {
    if (this.searchTitle) {
      this.jobService.searchJobsByTitle(this.searchTitle).subscribe(
        (data: JobDTO[]) => {
          this.jobs = data;
        },
        (error) => {
          console.error('Error searching jobs', error);
        }
      );
    } else {
      this.loadJobs();
    }
  }

  openJobDetailModal(job: JobDTO): void {
    const modalRef = this.modalService.open(JobApplicationComponent, {
      size: "lg",
    });
    modalRef.componentInstance.job = job;
  }

  
}
