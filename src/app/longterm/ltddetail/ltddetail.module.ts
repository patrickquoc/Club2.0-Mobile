import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LTDDetailPageRoutingModule } from './ltddetail-routing.module';

import { LTDDetailPage } from './ltddetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LTDDetailPageRoutingModule
  ],
  declarations: [LTDDetailPage]
})
export class LTDDetailPageModule {}
