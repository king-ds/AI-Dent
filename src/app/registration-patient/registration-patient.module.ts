import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationPatientPageRoutingModule } from './registration-patient-routing.module';

import { RegistrationPatientPage } from './registration-patient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationPatientPageRoutingModule
  ],
  declarations: [RegistrationPatientPage]
})
export class RegistrationPatientPageModule {}
