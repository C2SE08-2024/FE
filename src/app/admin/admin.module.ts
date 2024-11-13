import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { BodyComponent } from './component/body/body.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeModule } from '../home/home.module';
import { AccountPageComponent } from './component/account-manage/account-page/account-page.component';



@NgModule({
  declarations: [SidenavComponent, BodyComponent, AdminPageComponent, DashboardComponent, AccountPageComponent],
  imports: [
    CommonModule,
    RoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class AdminModule { }
