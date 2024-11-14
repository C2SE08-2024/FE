import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './component/account/account.component';
import { AccountDetailComponent } from './component/account-detail/account-detail.component';


const routes: Routes = [
  {
  path: '', component: AccountComponent,
    children: [
      { path: '', redirectTo: 'account-detail', pathMatch: 'full'},
      { path: 'account-detail', component: AccountDetailComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
