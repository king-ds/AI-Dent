import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  // { path : '', loadChildren : './clinician-dashboard/clinician-dashboard.module#ClinicianDashboardPageModule' },
  // { path : 'clinician-dashboard', loadChildren : './clinician-dashboard/clinician-dashboard.module#ClinicianDashboardPageModule' },
  { path : 'instructor-dashboard', loadChildren : './instructor-dashboard/instructor-dashboard.module#InstructorDashboardPageModule' },
  { path : 'patient-dashboard', loadChildren : './patient-dashboard/patient-dashboard.module#PatientDashboardPageModule' },
  { path : 'add-patients/:id', loadChildren: './patient-details/patient-details.module#PatientDetailsPageModule' },
  { path : 'selection/:id', loadChildren: './track-record/selection/selection.module#SelectionPageModule' },
  { path : 'menu', loadChildren: './menu/menu.module#MenuPageModule' },
  {
    path: 'clinician-viewer',
    loadChildren: () => import('./clinician-viewer/clinician-viewer.module').then( m => m.ClinicianViewerPageModule)
  },
  {
    path: 'instructor-viewer',
    loadChildren: () => import('./instructor-viewer/instructor-viewer.module').then( m => m.InstructorViewerPageModule)
  },

];


@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class MemberRoutingModule { }
