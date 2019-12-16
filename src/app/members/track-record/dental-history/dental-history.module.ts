import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentalHistoryPageRoutingModule } from './dental-history-routing.module';

import { DentalHistoryPage } from './dental-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentalHistoryPageRoutingModule
  ],
  declarations: [DentalHistoryPage]
})
export class DentalHistoryPageModule {}
