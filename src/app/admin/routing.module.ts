import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { CourseListComponent } from './component/course/course-list/course-list.component';
import { CourseCreateComponent } from './component/course/course-create/course-create.component';
import { CourseDetailComponent } from './component/course/course-detail/course-detail.component';
import { TestQuestionComponent } from './component/test/test-question/test-question.component';

const routes: Routes = [
  {
    path: '', component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'account', component: AccountListComponent },
      { path: 'course', component: CourseListComponent },
      { path: 'course/:id', component: CourseDetailComponent },
      { path: 'course/:courseId/test/:testId/test-question', component: TestQuestionComponent },
      { path: 'course/course-create', component: CourseCreateComponent },
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
