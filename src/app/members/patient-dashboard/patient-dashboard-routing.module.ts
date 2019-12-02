import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDashboardPage } from './patient-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDashboardPageRoutingModule {}
