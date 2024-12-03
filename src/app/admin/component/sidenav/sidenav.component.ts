import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { adminNavbarData, instructorNavbarData } from './navData';
import { TokenStorageService } from 'src/app/service/token/token-storage.service';
interface SideNavToggle{
  screenWidth: number;
  collapsed: boolean;
}

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent implements OnInit {

  @Output() onToggleSideNav: EventEmitter<SideNavToggle> = new EventEmitter();
  collapsed = false;
  screenWidth = 0;
  isLoggedIn = false;
  navData = [] ;

  @HostListener('window: resize',['$event'])
  onResize(event:any){
    this.screenWidth = innerWidth;
    if(this.screenWidth <= 768){
      this.collapsed = false;
      this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  }

  username: string;
  currentUser: string;
  role = '';

  constructor(private router: Router,
              private tokenStorageService: TokenStorageService,
  ) {}

  ngOnInit(): void {
    this.screenWidth = innerWidth;
    this.loadHeader();
  }
 
  loadHeader(): void {
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = !!this.tokenStorageService.getToken();
      this.role = this.tokenStorageService.getRole();
      if(this.role === 'ROLE_INSTRUCTOR')
        this.navData = instructorNavbarData;
      else if (this.role === 'ROLE_ADMIN')
        this.navData = adminNavbarData;
    }
  }

  toggleCollapse() : void{
    this.collapsed=!this.collapsed;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  closeSidenav():void{
    this.collapsed=false;
    this.onToggleSideNav.emit({collapsed: this.collapsed, screenWidth: this.screenWidth});
  }

  LogOut(){
    this.tokenStorageService.signOut();
    this.router.navigateByUrl('/login');
  }
}

