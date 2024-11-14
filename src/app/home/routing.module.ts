import { NgModule, Component } from '@angular/core';
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

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomepageComponent},
      { path: 'business', component: BusinessComponent},
      { path: 'business/:id', component: BusinessdetailComponent},
      { path: 'create-cv', component: CreateCvComponent},
      { path: 'course', component: CourseComponent},
      { path: 'contact-us', component: ContactUsComponent},

    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent,}

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
