import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DataResolverService } from './service/data-resolver.service';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    redirectTo: 'welcome',
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
    loadChildren: () => import('./longterm/ltdcreation/ltdcreation.module').then( m => m.LTDCreationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view/ltd/:id',
    resolve: { 
      special: DataResolverService
    },
    loadChildren: () => import('./longterm/ltddetail/ltddetail.module').then( m => m.LTDDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view/ltd/comments/:id',
    resolve: { 
      special: DataResolverService
    },
    loadChildren: () => import('./longterm/ltddetail/ltdcomment/ltdcomment.module').then( m => m.LTDCommentPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'create/std',
    loadChildren: () => import('./shortterm/stdcreation/stdcreation.module').then( m => m.STDCreationPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'view/std/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./shortterm/stddetail/stddetail.module').then( m => m.STDDetailPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'participate/std/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./shortterm/discussion/stdbase/stdbase.module').then( m => m.STDBasePageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stdhistory',
    loadChildren: () => import('./shortterm/stdhistory/stdhistory.module').then( m => m.STDHistoryPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'stdhistory/summary/:id',
    resolve: {
      special: DataResolverService
    },
    loadChildren: () => import('./shortterm/stdsummary/stdsummary.module').then( m => m.STDSummaryPageModule),
    canActivate: [AuthGuard]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
