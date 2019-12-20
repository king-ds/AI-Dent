import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicianProfilePageRoutingModule } from './clinician-profile-routing.module';

import { ClinicianProfilePage } from './clinician-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ClinicianProfilePageRoutingModule
  ],
  declarations: [ClinicianProfilePage]
})
export class ClinicianProfilePageModule {}
