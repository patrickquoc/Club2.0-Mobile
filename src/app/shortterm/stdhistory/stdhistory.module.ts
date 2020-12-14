import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { STDHistoryPageRoutingModule } from './stdhistory-routing.module';

import { STDHistoryPage } from './stdhistory.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    STDHistoryPageRoutingModule
  ],
  declarations: [STDHistoryPage]
})
export class STDHistoryPageModule {}
