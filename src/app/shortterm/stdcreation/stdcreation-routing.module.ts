import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { STDCreationPage } from './stdcreation.page';

const routes: Routes = [
  {
    path: '',
    component: STDCreationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class STDCreationPageRoutingModule {}
