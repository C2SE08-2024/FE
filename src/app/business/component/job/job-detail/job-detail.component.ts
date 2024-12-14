import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JobDTO } from 'src/app/model/Job/job';

import { BusinessService } from 'src/app/service/business/business.service';
import { JobService } from 'src/app/service/job/job.service';

@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() job: JobDTO;
  jobId: number;

  errorMessage: string;

  constructor(private activeRoute: ActivatedRoute,
              private router: Router,
              private businessService: BusinessService,
              private jobService: JobService,
              // public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    if (this.job) {
      this.loadJobDetail();
    } else {
      this.jobId = +this.activeRoute.snapshot.paramMap.get('jobId');
      this.loadJobDetail();
    }  
  }

  loadJobDetail():void{
    this.jobService.getJobById(this.jobId).subscribe(
      (data)=>{
        this.job = data;
      },
        (error) => {
          console.error('Error fetching tests:', error);
          this.errorMessage = 'Không thể tải thông tin tuyển dụng';
        }
    )
  }


  // goToTestQuestion( testId: number): void {
  //   this.router.navigate(['manage-binDev/course', this.course.courseId, 'test', testId, 'test-question']);
  // }

}
