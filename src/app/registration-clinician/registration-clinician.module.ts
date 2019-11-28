import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationClinicianPageRoutingModule } from './registration-clinician-routing.module';

import { RegistrationClinicianPage } from './registration-clinician.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RegistrationClinicianPageRoutingModule
  ],
  declarations: [RegistrationClinicianPage]
})
export class RegistrationClinicianPageModule {}
