import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { JobListComponent } from './component/job/job-list/job-list.component';
import { DnComponent } from './component/dn/dn.component';
import { JobDetailComponent } from './component/job/job-detail/job-detail.component';

const routes: Routes = [
  {
    path: '', component: DnComponent,
    children: [
      { path: 'job', component: JobListComponent},
      { path: 'job/:jobId/detail', component: JobDetailComponent},
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes) 
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
