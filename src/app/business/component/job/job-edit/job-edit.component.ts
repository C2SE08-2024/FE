import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobDTO } from 'src/app/model/Job/job';
import { JobService } from 'src/app/service/job/job.service';


@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit {

  @Input() job: JobDTO;
  editedJob: JobDTO;

  constructor(public activeModal: NgbActiveModal,
              private jobService: JobService

  ) { }

  ngOnInit(): void {
    this.editedJob = { ...this.job };
  }

  closeModal(): void {
    this.activeModal.close();
  }

  saveChanges(): void {
    this.jobService.updateJob(this.editedJob.jobId, this.editedJob)
      .subscribe(updated => {
        console.log('Job updated:', updated);
        this.activeModal.close(this.editedJob);
      });
      
  }

}
