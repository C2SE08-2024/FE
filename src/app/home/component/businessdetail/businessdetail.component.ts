import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-businessdetail',
  templateUrl: './businessdetail.component.html',
  styleUrls: ['./businessdetail.component.css']
})
export class BusinessdetailComponent implements OnInit {
  business: any;
  showCvForm: boolean = false; // Biến để hiển thị/ẩn form nộp CV
  cvForm: FormGroup;
  // Dữ liệu chi tiết cho các công ty IT tại Việt Nam
  businesses = [
    {
      id: 1,
      name: 'FPT Software',
      logoUrl: 'https://via.placeholder.com/100',
      industry: 'Công nghệ thông tin',
      description: 'Công ty hàng đầu Việt Nam về dịch vụ IT Outsourcing.',
      location: 'Hà Nội',
      details: {
        introduction: 'FPT Software cung cấp các dịch vụ phát triển phần mềm cho thị trường toàn cầu.',
        products: ['Phát triển phần mềm', 'Giải pháp AI', 'Dịch vụ đám mây'],
        contact: {
          address: 'Số 17, Đường Duy Tân, Hà Nội',
          phone: '024 1234 5678',
          email: 'info@fptsoftware.com'
        }
      }
    },
    {
      id: 2,
      name: 'VNG Corporation',
      logoUrl: 'https://via.placeholder.com/100',
      industry: 'Công nghệ thông tin',
      description: 'Công ty công nghệ lớn tại Việt Nam với các sản phẩm như Zalo, Zing MP3.',
      location: 'TP. Hồ Chí Minh',
      details: {
        introduction: 'VNG phát triển các sản phẩm công nghệ phục vụ hàng triệu người dùng.',
        products: ['Zalo', 'Zing MP3', 'Thanh toán số'],
        contact: {
          address: 'Số 13, Đường Tân Thới Nhất, TP.HCM',
          phone: '028 9876 5432',
          email: 'contact@vng.com.vn'
        }
      }
    },
    {
      id: 3,
      name: 'Viettel Digital',
      logoUrl: 'https://via.placeholder.com/100',
      industry: 'Công nghệ viễn thông',
      description: 'Dẫn đầu về giải pháp viễn thông và công nghệ số tại Việt Nam.',
      location: 'Hà Nội',
      details: {
        introduction: 'Viettel Digital phát triển các giải pháp viễn thông và công nghệ số cho thị trường Việt Nam.',
        products: ['Dịch vụ viễn thông', 'Giải pháp chuyển đổi số', 'Công nghệ 5G'],
        contact: {
          address: 'Tòa nhà Viettel, Hà Nội',
          phone: '024 9876 5432',
          email: 'support@viettel.com.vn'
        }
      }
    },
    {
      id: 4,
      name: 'Techcombank',
      logoUrl: 'https://via.placeholder.com/100',
      industry: 'Tài chính công nghệ',
      description: 'Ngân hàng số tiên tiến với các dịch vụ tài chính tích hợp công nghệ.',
      location: 'TP. Hồ Chí Minh',
      details: {
        introduction: 'Techcombank là ngân hàng tiên phong trong việc áp dụng công nghệ số vào dịch vụ tài chính.',
        products: ['Ngân hàng số', 'Dịch vụ đầu tư trực tuyến', 'Tài chính doanh nghiệp'],
        contact: {
          address: '191 Bà Triệu, TP.HCM',
          phone: '028 1234 5678',
          email: 'contact@techcombank.com.vn'
        }
      }
    },
    {
      id: 5,
      name: 'Cốc Cốc',
      logoUrl: 'https://via.placeholder.com/100',
      industry: 'Công nghệ thông tin',
      description: 'Trình duyệt và công cụ tìm kiếm phát triển bởi người Việt.',
      location: 'Hà Nội',
      details: {
        introduction: 'Cốc Cốc phát triển trình duyệt và công cụ tìm kiếm đáp ứng nhu cầu người dùng Việt.',
        products: ['Trình duyệt Cốc Cốc', 'Công cụ tìm kiếm Cốc Cốc', 'Quảng cáo trực tuyến'],
        contact: {
          address: 'Tòa nhà Cốc Cốc, Hà Nội',
          phone: '024 6543 2109',
          email: 'info@coccoc.com'
        }
      }
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router,private fb: FormBuilder,) {
    this.cvForm = this.fb.group({
      cvFile: [null, [Validators.required, this.pdfFileValidator]]
    });
  }

  
  ngOnInit(): void {
    const businessId = Number(this.route.snapshot.paramMap.get('id'));
    this.business = this.businesses.find(b => b.id === businessId);
  }

  goBack(): void {
    this.router.navigate(['/business']);
  }
   // Hàm để hiển thị form nộp CV
   toggleCvForm(): void {
    this.showCvForm = !this.showCvForm;
  }

  // Hàm xử lý khi nộp CV
  submitCv(): void {
    if (this.cvForm.valid) {
      console.log('File CV:', this.cvForm.get('cvFile')?.value);
      alert('Nộp CV thành công!');
      this.cvForm.reset();
      this.showCvForm = false;
    } else {
      alert('Vui lòng chọn file PDF.');
    }
  }

  // Hàm xử lý tải lên file CV và kiểm tra loại file
  onFileChange(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.cvForm.patchValue({ cvFile: file });
    }
  }

  // Hàm xác nhận file tải lên phải là PDF
  pdfFileValidator(control: any) {
    const file = control.value;
    if (file && file.type !== 'application/pdf') {
      return { pdfFile: true };
    }
    return null;
  }
}
