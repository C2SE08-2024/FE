import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DnComponent } from './component/dn/dn.component';
import { JobListComponent } from './component/job/job-list/job-list.component';
import { HomeModule } from "../home/home.module";
import { JobDetailComponent } from './component/job/job-detail/job-detail.component';



@NgModule({
  declarations: [
    DnComponent, 
    JobListComponent, JobDetailComponent],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
]
})
export class BusinessModule { }
