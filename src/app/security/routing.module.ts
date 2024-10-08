import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { SignupComponent } from './component/signup/signup.component';
import { HomepageComponent } from '../home/component/homepage/homepage.component';
const routes: Routes = [

  { path: 'login', component: LoginComponent },
  { path: '', component: HomepageComponent},
  { path: 'signup', component: SignupComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,

  ]
})
export class RoutingModule { }
