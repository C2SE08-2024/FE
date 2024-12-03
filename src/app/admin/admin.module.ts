import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { BodyComponent } from './component/body/body.component';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { HomeModule } from '../home/home.module';
import { CourseListComponent } from './component/course/course-list/course-list.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { CourseDetailComponent } from './component/course/course-detail/course-detail.component';
import { CourseEditComponent } from './component/course/course-edit/course-edit.component';
import { CourseCreateComponent } from './component/course/course-create/course-create.component';



@NgModule({
  declarations: [
    SidenavComponent, 
    BodyComponent, 
    AdminPageComponent, 
    DashboardComponent,  
    CourseListComponent, 
    AccountListComponent, 
    CourseDetailComponent, 
    CourseEditComponent, 
    CourseCreateComponent
  ],
  imports: [
    CommonModule,
    RoutingModule, 
    FormsModule,
    ReactiveFormsModule,
    HomeModule
  ]
})
export class AdminModule { }
