import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/component/home/home.component';
import { HomeModule } from './home/home.module';




const routes: Routes = [
  {path: '', loadChildren: () => import('./home/home.module').then(module => module.HomeModule)},
  {path: 'login', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
  {path: 'signup', loadChildren: () => import('./security/security.module').then(module => module.SecurityModule)},
  {path: 'mangage-binDev', loadChildren:() => import('./admin/admin.module').then(module => module.AdminModule)}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
