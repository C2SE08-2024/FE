import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { CourseListComponent } from './component/course/course-list/course-list.component';

const routes: Routes = [
  {
    path: '', component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'account', component: AccountListComponent },
      { path: 'course', component: CourseListComponent },
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
