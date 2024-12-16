import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AdminPageComponent } from './component/admin-page/admin-page.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { CourseListComponent } from './component/course/course-list/course-list.component';
import { CourseCreateComponent } from './component/course/course-create/course-create.component';
import { CourseDetailComponent } from './component/course/course-detail/course-detail.component';
import { TestQuestionComponent } from './component/test-question/test-question-list/test-question.component';
import { LessonDetailComponent } from './component/lesson/lesson-detail/lesson-detail.component';
import { LessonListComponent } from './component/lesson/lesson-list/lesson-list.component';
import { TestListComponent } from './component/test/test-list/test-list.component';
import { LessonCreateComponent } from './component/lesson/lesson-create/lesson-create.component';

const routes: Routes = [
  {
    path: '', component: AdminPageComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full'},
      { path: 'dashboard', component: DashboardComponent },
      { path: 'account', component: AccountListComponent },
      { path: 'course', component: CourseListComponent },
      { path: 'course/create', component: CourseCreateComponent },
      { path: 'course/:id', component: CourseDetailComponent,
        children: [
          { path: '', redirectTo: 'lesson', pathMatch: 'full'},
          { path: 'lesson', component: LessonListComponent},
          { path: 'test', component: TestListComponent},
          { path: 'lesson/create', component: LessonCreateComponent},
        ]
      },
      { path: 'course/:id/lesson/:lessonId', component: LessonDetailComponent},
      { path: 'course/:id/test/:testId/test-question', component: TestQuestionComponent}
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
