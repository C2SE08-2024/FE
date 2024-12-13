import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BusinessService } from 'src/app/service/business/business.service';

@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.css']
})
export class JobListComponent implements OnInit {

  searchQuery = '';
  selectedCity = 'all';
  cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'];
  businesses: any[] = [];
  filteredJobs: any [] ;
  jobs: any [];

  constructor(private router: Router,
              private businessService: BusinessService,
  ) {}

  ngOnInit(): void {
    // this.getAllBusinesses();
    // this.getBusinessById();
    // this.getBusinessDetails();
  }

  viewDetails(jobId: number): void {
    this.router.navigate(['/my-business/job', jobId]);
  }

  getAllBusinesses(): void {
    this.businessService.getAllBusinesses().subscribe(data => {
      this.businesses = data;  
      this.filteredJobs = this.businesses;
    });
  }

  // getBusinessById(): void {
  //   this.businessService.getBusinessById(1).subscribe(data => {
  //     this.businesses = data;
  //   });
  // }


  filterJobs(): void {
    this.filteredJobs = this.businesses.filter(business => {
      const matchesCity = this.selectedCity === 'all' || business.location === this.selectedCity;
      const matchesSearch = business.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            business.industry.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCity && matchesSearch;
    });
  }

}
