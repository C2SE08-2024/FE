import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/service/auth/auth-service.service';
import { TokenStorageService } from '../../../service/token/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm : FormGroup;

  errorMessage: string | null = null;

  constructor(private authService: AuthService,
              private router: Router,
              private tokenStorageService: TokenStorageService
              ) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required,]),
      password: new FormControl('', [Validators.required,]),
      remember_me: new FormControl(''),
    }
    );
  }

  onLogin(): void {
    if (this.loginForm.valid) {
      this.authService.login(this.loginForm.value).subscribe(
        data => {
          console.log(data);
          if (this.loginForm.value.remember_me) {
            sessionStorage.clear();
            this.tokenStorageService.saveTokenLocal(data.token);
            this.tokenStorageService.saveUserLocal(data.username);
            this.tokenStorageService.saveRoleLocal(data.roles[0]);
          } else {
            localStorage.clear();
            this.tokenStorageService.saveTokenSession(data.token);
            this.tokenStorageService.saveUserSession(data.username);
            this.tokenStorageService.saveRoleSession(data.roles[0]);
          }          
          if(this.tokenStorageService.getRole() === 'ROLE_STUDENT' || this.tokenStorageService.getRole() === 'ROLE_BUSINESS')
            this.router.navigate(['/home']);
          else if(this.tokenStorageService.getRole() === 'ROLE_BUSINESS')
            this.router.navigate(['/business1']);
          else if(this.tokenStorageService.getRole() === 'ROLE_INSTRUCTOR' || this.tokenStorageService.getRole() === 'ROLE_ADMIN')
            this.router.navigate(['/mangage-binDev']);
        },
        error => {
          console.log('Lỗi đăng nhập', error);          
        }
      );
    }
  }
  }
