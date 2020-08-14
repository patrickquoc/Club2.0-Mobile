import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { STDBasePageRoutingModule } from './stdbase-routing.module';

import { STDBasePage } from './stdbase.page';
import { STDLobbyComponent } from '../components/stdlobby/stdlobby.component';
import { STDArgumentCreatorComponent } from '../components/stdargument-creator/stdargument-creator.component';
import { STDRatingComponent } from '../components/stdrating/stdrating.component';
import { STDResultComponent } from '../components/stdresult/stdresult.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    STDBasePageRoutingModule
  ],
  declarations: [STDBasePage, STDLobbyComponent, STDArgumentCreatorComponent, STDRatingComponent, STDResultComponent]
})
export class STDBasePageModule {}
