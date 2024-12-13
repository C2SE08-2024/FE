import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Business } from 'src/app/model/Business/business';
import { BusinessService } from 'src/app/service/business/business.service';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  searchQuery = '';
  selectedCity = 'all';
  cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'];
  
  businesses : Business[];

  // filteredBusinesses = this.businesses;

  constructor(private router: Router,
              private businessService: BusinessService,
  ) {}

  ngOnInit(): void {
    this.loadBusinesses();
  }

  viewDetails(businessId: number): void {
    this.router.navigate(['/business', businessId]);
  }

  loadBusinesses(): void {
    this.businessService.getAllBusinesses().subscribe(
      (data) => {
        this.businesses = data;
      },
      (error) => {
        console.error('Error fetching businesses', error);
      }
    );
  }

  // filterBusinesses(): void {
  //   this.filteredBusinesses = this.businesses.filter(business => {
  //     const matchesCity = this.selectedCity === 'all' || business.location === this.selectedCity;
  //     const matchesSearch = business.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
  //                           business.industry.toLowerCase().includes(this.searchQuery.toLowerCase());
  //     return matchesCity && matchesSearch;
  //   });
  // }
}
