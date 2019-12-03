import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path : 'clinician-dashboard', loadChildren : './clinician-dashboard/clinician-dashboard.module#ClinicianDashboardPageModule' },
  { path : 'instructor-dashboard', loadChildren : './instructor-dashboard/instructor-dashboard.module#InstructorDashboardPageModule' },
  { path : 'patient-dashboard', loadChildren : './patient-dashboard/patient-dashboard.module#PatientDashboardPageModule' },
  { path : 'add-patients', loadChildren: './add-patients/add-patients.module#AddPatientsPageModule' },
  { path : 'add-patients/:id', loadChildren: './patient-details/patient-details.module#PatientDetailsPageModule' },
  { path : 'my-patients', loadChildren: './my-patients/my-patients.module#MyPatientsPageModule' },
  { path : 'selection/:id', loadChildren: './track-record/selection/selection.module#SelectionPageModule' },
];


@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class MemberRoutingModule { }