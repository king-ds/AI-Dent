import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicianDashboardPageRoutingModule } from './clinician-dashboard-routing.module';

import { ClinicianDashboardPage } from './clinician-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicianDashboardPageRoutingModule
  ],
  declarations: [ClinicianDashboardPage]
})
export class ClinicianDashboardPageModule {}
