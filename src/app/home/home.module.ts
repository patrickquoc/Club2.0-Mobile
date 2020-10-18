import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { LTDViewComponent } from '../longterm/ltdview/ltdview.component';
import { STDViewComponent } from '../shortterm/stdview/stdview.component';
import { STDArgumentCreatorComponent } from '../shortterm/discussion/components/stdargument-creator/stdargument-creator.component';
import { STDRatingComponent } from '../shortterm/discussion/components/stdrating/stdrating.component';
import { ProfileComponent } from '../profile/profile.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],

  declarations: [HomePage, LTDViewComponent, STDViewComponent, ProfileComponent]
})
export class HomePageModule {}
