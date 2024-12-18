import { Component, OnInit } from '@angular/core';
import { accData } from './account-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-account-list',
  templateUrl: './account-list.component.html',
  styleUrls: ['./account-list.component.css']
})
export class AccountListComponent implements OnInit {

    isLoading = true;
    errorMessage = '';
    showDeletePopup = false;
    deleteCourseId: number;

  
  
  constructor( 
               private modalService: NgbModal) { }

  ngOnInit(): void {
    
  }

  onEnter(){
    
  }

}
