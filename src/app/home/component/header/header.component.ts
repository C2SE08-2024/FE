import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  username: string;
  role = '';
  isLoggedIn = false;
  returnUrl: string;
  avatarSrc = '';
  dropdown: string | null = null;

  constructor(private tokenStorageService: TokenStorageService,
              private router: Router,
             ) { }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      console.log('Token:', this.tokenStorageService.getToken());
      this.role = this.tokenStorageService.getRole();
      console.log('role:', this.role);
      this.username = this.tokenStorageService.getUser();
      console.log('username:', this.username);
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/home']);
  }

  toHome() : void{
    this.router.navigate(['/home']);
  }

  toggleDropdown(type: string): void {
    this.dropdown = this.dropdown === type ? null : type;
  }

  closeDropdown(): void {
    this.dropdown = null;
  }
}
