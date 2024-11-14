import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-business',
  templateUrl: './business.component.html',
  styleUrls: ['./business.component.css']
})
export class BusinessComponent implements OnInit {
  searchQuery = '';
  selectedCity = 'all';
  cities = ['Hà Nội', 'TP. Hồ Chí Minh', 'Đà Nẵng', 'Hải Phòng'];
  
  // Dữ liệu doanh nghiệp mẫu với hình ảnh từ URL thực tế
  businesses = [
    {
      id: 1,
      name: 'FPT Software',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0e/FPT_Software_logo.svg/2560px-FPT_Software_logo.svg.png',
      industry: 'Công nghệ thông tin',
      description: 'Công ty hàng đầu Việt Nam về dịch vụ IT Outsourcing.',
      location: 'Hà Nội'
    },
    {
      id: 2,
      name: 'VNG Corporation',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/VNG_logo.svg/2560px-VNG_logo.svg.png',
      industry: 'Công nghệ thông tin',
      description: 'Công ty công nghệ lớn tại Việt Nam với các sản phẩm như Zalo, Zing MP3.',
      location: 'TP. Hồ Chí Minh'
    },
    {
      id: 3,
      name: 'Viettel Digital',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/6/69/Viettel_logo.png',
      industry: 'Công nghệ viễn thông',
      description: 'Dẫn đầu về giải pháp viễn thông và công nghệ số tại Việt Nam.',
      location: 'Hà Nội'
    },
    {
      id: 4,
      name: 'Techcombank',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Techcombank_logo.svg/2560px-Techcombank_logo.svg.png',
      industry: 'Tài chính công nghệ',
      description: 'Ngân hàng số tiên tiến với các dịch vụ tài chính tích hợp công nghệ.',
      location: 'TP. Hồ Chí Minh'
    },
    {
      id: 5,
      name: 'Cốc Cốc',
      logoUrl: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/Coccoc-logo.png/2560px-Coccoc-logo.png',
      industry: 'Công nghệ thông tin',
      description: 'Trình duyệt và công cụ tìm kiếm phát triển bởi người Việt.',
      location: 'Hà Nội'
    }
  ];

  filteredBusinesses = this.businesses;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.filterBusinesses();
  }

  viewDetails(businessId: number): void {
    this.router.navigate(['/business', businessId]);
  }

  filterBusinesses(): void {
    this.filteredBusinesses = this.businesses.filter(business => {
      const matchesCity = this.selectedCity === 'all' || business.location === this.selectedCity;
      const matchesSearch = business.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                            business.industry.toLowerCase().includes(this.searchQuery.toLowerCase());
      return matchesCity && matchesSearch;
    });
  }
}
