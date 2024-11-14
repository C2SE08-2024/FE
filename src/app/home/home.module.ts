import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RoutingModule } from './routing.module';
import { HeaderComponent } from './component/header/header.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomepageComponent } from './component/homepage/homepage.component';
import { HomeComponent } from './component/home/home.component';
import { FooterComponent } from './component/footer/footer.component';
import { CourseComponent } from './component/course/course.component';
import { ContactUsComponent } from './component/contact-us/contact-us.component';
import { CreateCvComponent } from './component/create-cv/create-cv.component';
import { BusinessComponent } from './component/business/business.component';
import { BusinessdetailComponent } from './component/businessdetail/businessdetail.component';




@NgModule({
  declarations: [
    HeaderComponent,
    HomepageComponent,
    HomeComponent,
    FooterComponent,
    CourseComponent,
    ContactUsComponent,
    CreateCvComponent,
    BusinessComponent,
    BusinessdetailComponent
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
