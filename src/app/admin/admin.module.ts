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
import { TestComponent } from './component/test/test/test.component';
import { TestQuestionComponent } from './component/test-question/test-question-list/test-question.component';
import { LessonDetailComponent } from './component/lesson/lesson-detail/lesson-detail.component';
import { LessonListComponent } from './component/lesson/lesson-list/lesson-list.component';
import { TestListComponent } from './component/test/test-list/test-list.component';
import { TestQuestionCreateComponent } from './component/test-question/test-question-create/test-question-create.component';
import { LessonCreateComponent } from './component/lesson/lesson-create/lesson-create.component';
import { LessonEditComponent } from './component/lesson/lesson-edit/lesson-edit.component';
import { StudentListComponent } from './component/account/student-list/student-list.component';
import { InstructorListComponent } from './component/account/instructor-list/instructor-list.component';
import { TestQuestionEditComponent } from './component/test-question/test-question-edit/test-question-edit.component';
import { RequestComponent } from './component/request/request.component';
import { StudentTestResultComponent } from './component/student-test-result/student-test-result.component';




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
    CourseCreateComponent, 
    TestComponent, 
    TestQuestionComponent, 
    LessonDetailComponent, 
    LessonListComponent, 
    TestListComponent, 
    TestQuestionCreateComponent, 
    LessonCreateComponent, 
    LessonEditComponent, 
    StudentListComponent, 
    InstructorListComponent,  
    TestQuestionEditComponent, 
    RequestComponent, 
    StudentTestResultComponent,  
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
