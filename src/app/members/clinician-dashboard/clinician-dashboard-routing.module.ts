import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianDashboardPage } from './clinician-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianDashboardPageRoutingModule {}
