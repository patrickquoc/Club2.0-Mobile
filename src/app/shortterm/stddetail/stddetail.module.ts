import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { STDDetailPageRoutingModule } from './stddetail-routing.module';

import { STDDetailPage } from './stddetail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    STDDetailPageRoutingModule
  ],
  declarations: [STDDetailPage]
})
export class STDDetailPageModule {}
