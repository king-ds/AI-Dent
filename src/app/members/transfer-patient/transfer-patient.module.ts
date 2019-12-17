import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TransferPatientPageRoutingModule } from './transfer-patient-routing.module';

import { TransferPatientPage } from './transfer-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TransferPatientPageRoutingModule
  ],
  declarations: [TransferPatientPage]
})
export class TransferPatientPageModule {}
