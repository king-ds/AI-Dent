import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicianCdarPageRoutingModule } from './clinician-cdar-routing.module';

import { ClinicianCdarPage } from './clinician-cdar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicianCdarPageRoutingModule
  ],
  declarations: [ClinicianCdarPage]
})
export class ClinicianCdarPageModule {}
