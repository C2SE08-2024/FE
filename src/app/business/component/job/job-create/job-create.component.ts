import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JobService } from '../../../../service/job/job.service';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/service/business/business.service';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {


  addJob: FormGroup;
  businessId:number;
  constructor(public activeModal: NgbActiveModal,
              private formBuilder: FormBuilder,
              private JobService: JobService,
              private router: Router,
              private businessService: BusinessService,
  ) { }

  ngOnInit(): void {
      this.buildJobForm();
      this.businessService.getBusinessUserDetail().subscribe((data)=>{
        this.businessId=data.businessId
        if(this.businessId){
          this.addJob.patchValue({
            businessId: this.businessId,
          });
        }
      })
    }
  
    buildJobForm() {
      this.addJob = this.formBuilder.group({
        jobTitle: ["", [Validators.required, Validators.maxLength(45)]],
        jobDescription: ["",[Validators.required, Validators.min(1), Validators.max(1000000000)]],
        location: ["", [Validators.required]],
        industry: ["", [Validators.required]],
        requirement: ["", [Validators.required]],
        status: ["", [Validators.required]],
        salaryRange: ["", [Validators.required]],
        jobType: ["", [Validators.required]],
        posterDate: [, [Validators.required]],
        expiryDate: [, [Validators.required]],
        businessId:[,[Validators.required]]
      });
    }

  closeModal(): void {
    this.activeModal.close();
  }

  submit() {
    this.JobService.createJob(this.addJob.value).subscribe((data) =>{
      const jobId = data.jobId;
      this.closeModal();
      // this.router.navigateByUrl(this.router.url, { skipLocationChange: true });
      window.location.reload();
    })
  }

  reset() {
    this.addJob.reset();
  }

}
