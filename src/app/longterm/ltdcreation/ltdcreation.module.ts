import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TagInputModule } from 'ngx-chips';

import { LTDCreationPageRoutingModule } from './ltdcreation-routing.module';

import { LTDCreationPage } from './ltdcreation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    LTDCreationPageRoutingModule,
    TagInputModule
  ],
  declarations: [LTDCreationPage]
})
export class LTDCreationPageModule {}
