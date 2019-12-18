import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientTrackRecordsPageRoutingModule } from './patient-track-records-routing.module';

import { PatientTrackRecordsPage } from './patient-track-records.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientTrackRecordsPageRoutingModule
  ],
  declarations: [PatientTrackRecordsPage]
})
export class PatientTrackRecordsPageModule {}
