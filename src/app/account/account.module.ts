import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './component/account/account.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { HomeModule } from "../home/home.module";
import { FormsModule } from '@angular/forms';
import { MyCourseComponent } from './component/my-course/my-course.component';



@NgModule({
  declarations: [
    AccountComponent, 
    AccountDetailComponent,
    MyCourseComponent
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    HomeModule,
    FormsModule 
]
})
export class AccountModule { }
