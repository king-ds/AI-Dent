import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianDashboardPage } from './clinician-dashboard.page';

const routes: Routes = [
  {
    path: 'clinician-dashboard',
    component: ClinicianDashboardPage,
    children : [
      { path : 'my-patients', loadChildren: '../my-patients/my-patients.module#MyPatientsPageModule' },
      { path : 'add-patients', loadChildren: '../add-patients/add-patients.module#AddPatientsPageModule' },
      {
        path: '',
        redirectTo: '/members/clinician-dashboard/my-patients',
        pathMatch: 'full',
      },

    ]
  },
  {
    path: '',
    redirectTo: '/members/clinician-dashboard/my-patients',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianDashboardPageRoutingModule {}
