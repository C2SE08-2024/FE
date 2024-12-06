import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DnComponent } from './component/dn/dn.component';
import { JobListComponent } from './component/job/job-list/job-list.component';
import { HomeModule } from "../home/home.module";



@NgModule({
  declarations: [
    DnComponent, 
    JobListComponent],
  imports: [
    CommonModule,
    RoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HomeModule
]
})
export class BusinessModule { }
