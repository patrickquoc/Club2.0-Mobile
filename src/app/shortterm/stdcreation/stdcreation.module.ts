import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { STDCreationPageRoutingModule } from './stdcreation-routing.module';

import { STDCreationPage } from './stdcreation.page';
import { TagInputModule } from 'ngx-chips';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    STDCreationPageRoutingModule,
    TagInputModule, 
    ReactiveFormsModule
  ],
  declarations: [STDCreationPage]
})
export class STDCreationPageModule {}
