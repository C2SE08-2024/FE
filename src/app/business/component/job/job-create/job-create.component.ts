import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-job-create',
  templateUrl: './job-create.component.html',
  styleUrls: ['./job-create.component.css']
})
export class JobCreateComponent implements OnInit {

  constructor(public activeModal: NgbActiveModal,
  ) { }

  ngOnInit(): void {

  }

  closeModal(): void {
    this.activeModal.close();
  }

}
