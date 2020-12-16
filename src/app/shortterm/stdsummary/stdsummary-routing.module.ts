import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { STDSummaryPage } from './stdsummary.page';

const routes: Routes = [
  {
    path: '',
    component: STDSummaryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class STDSummaryPageRoutingModule {}
