import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientDashboardPage } from './patient-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: PatientDashboardPage,
    children : [
      { path : 'patient-profile', loadChildren: '../patient-profile/patient-profile.module#PatientProfilePageModule' },
      { path : 'patient-track-records', loadChildren: '../patient-track-records/patient-track-records.module#PatientTrackRecordsPageModule' },
      {
        path: '',
        redirectTo: '/members/patient-dashboard/patient-track-records',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/members/patient-dashboard/patient-track-records',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientDashboardPageRoutingModule {}
