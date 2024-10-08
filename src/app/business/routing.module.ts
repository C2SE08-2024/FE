import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    // path: '', component: ,
    // children: [
    //   { path: '', redirectTo: 'home', pathMatch: 'full'},
    //   { path: 'home', component: HomepageComponent},
    // ]
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
