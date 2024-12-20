import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-request-list',
  templateUrl: './request-list.component.html',
  styleUrls: ['./request-list.component.css']
})
export class RequestListComponent implements OnInit {

  proposals: any[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.fetchProposals();
  }

  fetchProposals() {
    const url = '/api/course-proposals'; // Adjust endpoint to list proposals
    this.http.get<any[]>(url).subscribe({
      next: (data) => (this.proposals = data),
      error: (err) => console.error('Error fetching proposals:', err),
    });
  }

  approveProposal(proposalId: number) {
    const url = `/admin/course-proposals/${proposalId}/approve`;
    const body = { instructorId: 123 }; // Replace with actual instructor ID
    this.http.post(url, body).subscribe({
      next: () => {
        alert('Proposal approved successfully');
        this.fetchProposals(); // Refresh proposals list
      },
      error: (err) => alert('Error: ' + err.error),
    });
  }
}