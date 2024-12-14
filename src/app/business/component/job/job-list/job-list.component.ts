import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JobDTO } from 'src/app/model/Job/job';
import { BusinessService } from 'src/app/service/business/business.service';
import { JobService } from 'src/app/service/job/job.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  isLoggedIn = false;
  searchQuery = '';
  jobs: JobDTO [];
  role: any;
  username: string;
  businessId: number;

  constructor(private router: Router,
              private businessService: BusinessService,
              private jobService: JobService,
              private tokenStorageService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    // this.getAllBusinesses();
    // this.getBusinessById();
    // this.getBusinessDetails();
  }

  viewDetails(jobId: number): void {
    this.router.navigate(['/my-business/job', jobId]);
  }

  loadHeader(): void {
    this.username = this.tokenStorageService.getUser();
    this.businessService.getBusinessUserDetail().subscribe((data) => {
      this.businessId = data.businessId;
      if(this.businessId){

      }
    })
  }

  loadJob(): void{
    
  }

}
