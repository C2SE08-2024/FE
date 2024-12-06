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
import { PaymentComponent } from './component/payment/payment.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,  // Trang HomeComponent là trang chính
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },  // Khi vào trang chính thì chuyển tới '/home'
      { path: 'home', component: HomepageComponent },  // Trang chủ
      { path: 'business', component: BusinessComponent },  // Trang doanh nghiệp
      { path: 'business/:id', component: BusinessdetailComponent },  // Chi tiết doanh nghiệp
      { path: 'create-cv', component: CreateCvComponent },  // Tạo CV
      { path: 'course', component: CourseComponent },  // Trang danh sách khóa học
      { path: 'contact-us', component: ContactUsComponent },  // Liên hệ
      { path: 'course/:id', component: DetailcourseComponent },  // Chi tiết khóa học (với id)
      { path: 'payment/:id', component: PaymentComponent },  // Thanh toán
    ]
  },
  { path: 'login', component: LoginComponent },  // Đăng nhập
  { path: 'signup', component: SignupComponent },  // Đăng ký
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)  // Cấu hình các routes trong module này
  ],
  exports: [RouterModule]
})
export class RoutingModule { }
