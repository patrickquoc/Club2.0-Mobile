import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LTDCreationPage } from './ltdcreation.page';

const routes: Routes = [
  {
    path: '',
    component: LTDCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LTDCreationPageRoutingModule {}
