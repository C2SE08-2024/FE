import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth-service.service';
import { ProvinceService } from 'src/app/service/province/province.service';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm : FormGroup;
  message : string;
  cities = [];
  districts = [];
  wards = [];

  constructor(private authService: AuthService,
              private router: Router,
              private tokenStorageService: TokenStorageService,
              private provinceService: ProvinceService,
             ) 
              { }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.pattern('^[A-Za-zÀ-ỹà-ỹ]+ [A-Za-zÀ-ỹà-ỹ]+(?: [A-Za-zÀ-ỹà-ỹ]+)* ?$'),
        Validators.minLength(3),
        Validators.maxLength(50)
      ]),
      username: new FormControl('', [Validators.required, Validators.pattern('^[a-zA-Z0-9_]+$')]),
      gender: new FormControl(true, [Validators.required]),
      dateOfBirth: new FormControl('', [Validators.required]),
      address: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(100)
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('^(086|096|097|098|038|037|036|035|034|033|032|091|094|088|081|082|083|084|085|070|076|077|078|079|089|090|093|092|052|056|058|099|059|087)\\d{7}$')
      ]),
      idCard: new FormControl('', [
        Validators.required,
        Validators.pattern(/^\d{12}$/)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(30)]),
        
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(6),
        Validators.maxLength(30)
      ]),
    });

    this.provinceService.loadCitiesData().subscribe(
      (data) => {
        this.cities = data;
      },
      (error) => {
        console.error('Lỗi khi tải danh sách tỉnh/thành phố:', error);
      }
    );
  }

  onSubmit(): void {
    if (this.signupForm.valid) {
      this.authService.signupStudent(this.signupForm.value).subscribe(
        response => {
          console.log('Đăng ký thành công:', response);
          this.message = null;
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Đăng ký thất bại:', error);
          this.message = error.error.message;
        }
      );
    }
  }

  onCityChange(cityCode: number): void {
    const numericCityCode = Number(cityCode);
    this.provinceService.getDistrictsByCity(numericCityCode).subscribe(
      (districts) => {
        this.districts = districts;
        this.wards = [];
      }
    );
  }

  onDistrictChange(districtCode: number): void {
    const numericDistrictCode = Number(districtCode);
    this.provinceService.getWardsByDistrict(numericDistrictCode).subscribe(
      (wards) => {
        this.wards = wards;
      }
    );
  }

}
