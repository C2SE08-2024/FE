import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {

  courseProposalForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.courseProposalForm = this.fb.group({
      courseName: [''],
      description: ['']
    });
  }

  ngOnInit(): void {
    
  }
  submitProposal() {
    const url = '/managers/course-proposals';
    this.http.post(url, this.courseProposalForm.value).subscribe({
      next: () => alert('Proposal submitted successfully'),
      error: (err) => alert('Error: ' + err.error),
    });
  }


  

}
