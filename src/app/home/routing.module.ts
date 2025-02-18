import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../home/component/homepage/homepage.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from '../security/component/login/login.component';
import { SignupComponent } from '../security/component/signup/signup.component';
import { BusinessComponent } from './component/business/business.component';
import { BusinessdetailComponent } from './component/businessdetail/businessdetail.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CourseComponent } from './component/course/course.component';
import { CreateCvComponent } from './component/create-cv/create-cv.component';
import { DetailcourseComponent } from './component/detailcourse/detailcourse.component';
import { PaymentdetailComponent } from './component/paymentdetail/paymentdetail.component';
import { LessonComponent } from './component/lesson/lesson.component';
import { CartComponent } from './component/cart/cart.component';
import { PaymentSuccessComponent } from './component/payment-success/payment-success.component';
import { JobComponent } from './component/job/job.component';
import { ReviewListComponent } from './component/review/review-list/review-list.component';
import { StudentListComponent } from '../admin/component/account/student-list/student-list.component';
import { TestDetailComponent } from './component/test-detail/test-detail.component';
import { LessonDetailComponent } from '../admin/component/lesson/lesson-detail/lesson-detail.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,  // Trang HomeComponent là trang chính
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomepageComponent},
      { path: 'business', component: BusinessComponent},
      { path: 'business/:id', component: BusinessdetailComponent},
      { path: 'create-cv', component: CreateCvComponent},
      { path: 'course', component: CourseComponent },
      { path: 'contact-us', component: ContactUsComponent},
      { path: 'course/:id', component: DetailcourseComponent,
        children:[
          {path: 'course-student', component: StudentListComponent},
        ]
      },
      { path: 'cart', component: CartComponent },
      { path: 'paymentdetail/:cartId', component: PaymentdetailComponent},
      { path: 'carts/payment', component: PaymentSuccessComponent},
      { path: 'course/:id/detail', component: LessonComponent,
        children:[
          {path: 'lesson/:lessonId', component: LessonDetailComponent},
           {path: 'test/:testId', component: TestDetailComponent},
        ]
       },
      { path: 'job', component: JobComponent },
    ]
  },
  { path: 'login', component: LoginComponent }, 
  { path: 'signup', component: SignupComponent },  
  
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)  
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
