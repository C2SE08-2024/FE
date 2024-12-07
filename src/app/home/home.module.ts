import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './component/homepage/homepage.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { BusinessComponent } from './component/business/business.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CreateCvComponent } from './component/create-cv/create-cv.component';
import { BusinessdetailComponent } from './component/businessdetail/businessdetail.component';
import { DetailcourseComponent } from './component/detailcourse/detailcourse.component';
import { PaymentComponent } from './component/payment/payment.component';
import { CourseComponent } from './component/course/course.component';
import { PaymentdetailComponent } from './component/paymentdetail/paymentdetail.component';
import { LessonComponent } from './component/lesson/lesson.component';



@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    HomeComponent,
    FooterComponent,
    BusinessComponent,
    BusinessdetailComponent,
    ContactUsComponent,
    CreateCvComponent,
    DetailcourseComponent,
    PaymentComponent,
    CourseComponent,
    PaymentdetailComponent,
    LessonComponent,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    CommonModule,
    RoutingModule, 
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
       
  ],
  exports: [
    HeaderComponent
  ]
})
export class HomeModule { }
