import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  // Dữ liệu giả cho danh sách các công ty IT
  businesses = [
    { 
      id: 1,
      name: 'FPT Software', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/5f/FPT_logo.png',
      industry: 'Công nghệ thông tin',
      description: 'Công ty hàng đầu Việt Nam về dịch vụ IT Outsourcing.',
      location: 'Hà Nội'
    },
    { 
      id: 2,
      name: 'VNG Corporation', 
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7b/VNG_Corporation_logo.png',
      industry: 'Công nghệ thông tin',
      description: 'Công ty công nghệ lớn tại Việt Nam với các sản phẩm như Zalo, Zing MP3.',
      location: 'TP. Hồ Chí Minh'
    },
    { 
      id: 3,
      name: 'Viettel Digital', 
      logoUrl: 'https://via.placeholder.com/40',
      industry: 'Công nghệ viễn thông',
      description: 'Dẫn đầu về giải pháp viễn thông và công nghệ số tại Việt Nam.',
      location: 'Hà Nội'
    },
    { 
      id: 4,
      name: 'Techcombank', 
      logoUrl: 'https://via.placeholder.com/40',
      industry: 'Tài chính công nghệ',
      description: 'Ngân hàng số tiên tiến với các dịch vụ tài chính tích hợp công nghệ.',
      location: 'TP. Hồ Chí Minh'
    },
    { 
      id: 5,
      name: 'Cốc Cốc', 
      logoUrl: 'https://via.placeholder.com/40',
      industry: 'Công nghệ thông tin',
      description: 'Trình duyệt và công cụ tìm kiếm phát triển bởi người Việt.',
      location: 'Hà Nội'
    }
  ];

  filteredBusinesses = this.businesses;
  cities = ['Tất cả', 'Hà Nội', 'TP. Hồ Chí Minh'];
  selectedCity = 'Tất cả';
  searchQuery = '';

  constructor(private router: Router) {}

  ngOnInit(): void {}

  viewDetails(businessId: number): void {
    this.router.navigate(['/business', businessId]);
  }

  filterBusinesses(): void {
    this.filteredBusinesses = this.businesses.filter(business => {
      const matchesCity = this.selectedCity === 'Tất cả' || business.location === this.selectedCity;
      const matchesSearch = business.name.toLowerCase().includes(this.searchQuery.toLowerCase()) || 
                            business.industry.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCity && matchesSearch;
    });
  }
}
