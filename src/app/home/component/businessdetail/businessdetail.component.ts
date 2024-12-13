import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Business } from 'src/app/model/Business/business';
import { BusinessService } from 'src/app/service/business/business.service';

@Component({
  selector: 'app-businessdetail',
  templateUrl: './businessdetail.component.html',
  styleUrls: ['./businessdetail.component.css']
})
export class BusinessdetailComponent implements OnInit {

  showCvForm: boolean = false; 
  cvForm: FormGroup;
  business : Business;
  businessId: number;
  errorMessage: string;

  constructor(private route: ActivatedRoute, 
              private router: Router,
              private fb: FormBuilder,
              private businessService: BusinessService,
  ) {
    this.cvForm = this.fb.group({
      cvFile: [null, [Validators.required, this.pdfFileValidator]]
    });
  }

  
  ngOnInit(): void {
    this.businessId = Number(this.route.snapshot.paramMap.get('id'));
    console.log(this.businessId)
      this.loadBusinessById();
    
  }

  loadBusinessById(): void {
    this.businessService.getBusinessById(this.businessId).subscribe(
      (data) => {
        this.business = data;
      },
      (error) => {
        this.errorMessage = 'Doanh nghiệp không tồn tại!';
        console.error(error);
      }
    );
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
