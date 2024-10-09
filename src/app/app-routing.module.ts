import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';




const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: 'login', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
  {path: 'signup', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
