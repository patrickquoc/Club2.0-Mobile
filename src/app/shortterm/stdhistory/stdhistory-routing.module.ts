import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { STDHistoryPage } from './stdhistory.page';

const routes: Routes = [
  {
    path: '',
    component: STDHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class STDHistoryPageRoutingModule {}
