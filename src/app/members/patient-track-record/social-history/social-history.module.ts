import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SocialHistoryPageRoutingModule } from './social-history-routing.module';

import { SocialHistoryPage } from './social-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SocialHistoryPageRoutingModule
  ],
  declarations: [SocialHistoryPage]
})
export class SocialHistoryPageModule {}
