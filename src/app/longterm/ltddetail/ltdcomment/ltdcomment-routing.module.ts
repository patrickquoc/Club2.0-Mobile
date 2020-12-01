import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LTDCommentPage } from './ltdcomment.page';

const routes: Routes = [
  {
    path: '',
    component: LTDCommentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LTDCommentPageRoutingModule {}
