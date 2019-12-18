import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalHistoryPageRoutingModule } from './medical-history-routing.module';

import { MedicalHistoryPage } from './medical-history.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalHistoryPageRoutingModule
  ],
  declarations: [MedicalHistoryPage]
})
export class MedicalHistoryPageModule {}
