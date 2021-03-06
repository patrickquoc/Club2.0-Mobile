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
import { STDSummaryComponent } from '../components/stdsummary/stdsummary.component';
import { STDCommentComponent } from '../components/stdcomment/stdcomment.component';
import { STDCommentRatingComponent } from '../components/stdcomment-rating/stdcomment-rating.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    STDBasePageRoutingModule
  ],
  declarations: [
    STDBasePage, 
    STDLobbyComponent, 
    STDArgumentCreatorComponent, 
    STDRatingComponent, 
    STDResultComponent, 
    STDSummaryComponent,
    STDCommentComponent,
    STDCommentRatingComponent,
  ]
})
export class STDBasePageModule {}
