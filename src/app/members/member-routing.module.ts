import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

const routes: Routes = [
  { path : 'clinician-dashboard', loadChildren : './clinician-dashboard/clinician-dashboard.module#ClinicianDashboardPageModule' },
  { path : 'instructor-dashboard', loadChildren : './instructor-dashboard/instructor-dashboard.module#InstructorDashboardPageModule' },
  { path : 'patient-dashboard', loadChildren : './patient-dashboard/patient-dashboard.module#PatientDashboardPageModule' },
];


@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class MemberRoutingModule { }
