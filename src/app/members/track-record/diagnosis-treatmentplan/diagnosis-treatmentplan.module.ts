import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DiagnosisTreatmentplanPageRoutingModule } from './diagnosis-treatmentplan-routing.module';

import { DiagnosisTreatmentplanPage } from './diagnosis-treatmentplan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    DiagnosisTreatmentplanPageRoutingModule
  ],
  declarations: [DiagnosisTreatmentplanPage]
})
export class DiagnosisTreatmentplanPageModule {}
