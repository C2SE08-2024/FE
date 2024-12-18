import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JobService } from 'src/app/service/job/job.service';
import { JobDTO } from 'src/app/model/Job/job';
@Component({
  selector: 'app-job-application',
  templateUrl: './job-application.component.html',
  styleUrls: ['./job-application.component.css']
})
export class JobApplicationComponent implements OnInit {
  job: JobDTO | null = null;

  constructor(private route: ActivatedRoute,
              private jobService: JobService) { }

  ngOnInit(): void {
    const jobId = Number(this.route.snapshot.paramMap.get('jobId'));
    this.loadJobDetails(jobId);
  }

  loadJobDetails(jobId: number): void {
    this.jobService.getJobById(jobId).subscribe(
      (data: JobDTO) => {
        this.job = data;
      },
      (error) => {
        console.error('Error fetching job details', error);
      }
    );
  }

  applyForJob(): void {
    // Implement logic to apply for the job
    console.log(`Applying for job: ${this.job?.jobTitle}`);
  }
}
