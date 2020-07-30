import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { STDBasePage } from './stdbase.page';

const routes: Routes = [
  {
    path: '',
    component: STDBasePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class STDBasePageRoutingModule {}
