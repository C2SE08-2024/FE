import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';
import { RequestComponent } from '../admin/component/request/request.component';
import { MyCourseComponent } from './component/my-course/my-course.component';
import { MyTestComponent } from './component/my-test/my-test.component';


const routes: Routes = [
  {
  path: '', component: AccountComponent,
    children: [
      { path: '', redirectTo: 'account-detail', pathMatch: 'full'},
      { path: 'account-detail', component: AccountDetailComponent },
      { path: 'request', component: RequestComponent },
      { path: 'my-course', component: MyCourseComponent },
      { path: 'my-test', component: MyTestComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
