import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { STDSummaryPageRoutingModule } from './stdsummary-routing.module';

import { STDSummaryPage } from './stdsummary.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    STDSummaryPageRoutingModule
  ],
  declarations: [STDSummaryPage]
})
export class STDSummaryPageModule {}
