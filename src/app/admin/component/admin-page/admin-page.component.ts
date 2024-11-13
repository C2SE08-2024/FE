import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';

interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {

  username: string;
  currentUser: string;
  role = '';
  isLoggedIn = false;
  returnUrl: string;
  avatarSrc = '';

  isSideNavCollapsed = false;
  screenWidth = 0;

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
   ) { }

  ngOnInit(): void {
    this.loadHeader();
  }

  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.currentUser = this.tokenStorageService.getUser();
      console.log('currentUser:', this.currentUser);
      this.role = this.tokenStorageService.getRole();
      console.log('role:', this.role);
      this.username = this.tokenStorageService.getUser();
      console.log('UserName:', this.username);
      // this.getUserDetail();
    }
    console.log('Role hien tai la', this.role);
  }

  onToggleSideNav(data: SideNavToggle) : void{
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}
