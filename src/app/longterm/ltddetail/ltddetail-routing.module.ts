import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DataResolverService } from 'src/app/service/data-resolver.service';

import { LTDDetailPage } from './ltddetail.page';

const routes: Routes = [
  {
    path: '',
    component: LTDDetailPage
  },
  {
    path: 'view/ltd/comments/:id',
    resolve: { 
      special: DataResolverService
    },
    loadChildren: () => import('./ltdcomment/ltdcomment.module').then( m => m.LTDCommentPageModule)
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LTDDetailPageRoutingModule {}
