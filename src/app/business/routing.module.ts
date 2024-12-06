import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { DnComponent } from './component/dn/dn.component';

const routes: Routes = [
  {
    path: '', component: DnComponent,
    children: [
      // { path: '', redirectTo: '', pathMatch: 'full'},
      { path: '', component: DnComponent}

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
