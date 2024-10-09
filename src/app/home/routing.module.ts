import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from '../home/component/homepage/homepage.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from '../security/component/login/login.component';
import { SignupComponent } from '../security/component/signup/signup.component';


const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full'},
      { path: 'home', component: HomepageComponent},
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
