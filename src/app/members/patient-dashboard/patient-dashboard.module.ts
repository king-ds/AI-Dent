import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PatientDashboardPageRoutingModule } from './patient-dashboard-routing.module';

import { PatientDashboardPage } from './patient-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PatientDashboardPageRoutingModule
  ],
  declarations: [PatientDashboardPage]
})
export class PatientDashboardPageModule {}
