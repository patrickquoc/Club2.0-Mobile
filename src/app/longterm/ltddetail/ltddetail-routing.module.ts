import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LTDDetailPage } from './ltddetail.page';

const routes: Routes = [
  {
    path: '',
    component: LTDDetailPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LTDDetailPageRoutingModule {}
