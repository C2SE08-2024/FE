import { Component, Input, OnInit } from '@angular/core';
import { JobDTO } from 'src/app/model/Job/job';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-job-detail',
  templateUrl: './job-detail.component.html',
  styleUrls: ['./job-detail.component.css']
})
export class JobDetailComponent implements OnInit {

  @Input() job: JobDTO;

  constructor(public activeModal: NgbActiveModal,
  ) {}

  ngOnInit(): void {
    
  }

  closeModal(): void {
    this.activeModal.close();
  }

}
