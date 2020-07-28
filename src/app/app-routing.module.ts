import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DataResolverService } from './service/data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./registration/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./registration/signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'welcome',
    loadChildren: () => import('./welcome/welcome.module').then( m => m.WelcomePageModule)
  },
  {
    path: 'create/ltd',
    loadChildren: () => import('./longterm/ltdcreation/ltdcreation.module').then( m => m.LTDCreationPageModule)
  },
  {
    path: 'view/ltd/:id',
    resolve: { 
      special: DataResolverService
    },
    loadChildren: () => import('./longterm/ltddetail/ltddetail.module').then( m => m.LTDDetailPageModule)
  },
  {
    path: 'create/std',
    loadChildren: () => import('./shortterm/stdcreation/stdcreation.module').then( m => m.STDCreationPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
