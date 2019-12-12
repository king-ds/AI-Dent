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
  { path : 'complaint', loadChildren: './track-record/complaint/complaint.module#ComplaintPageModule' },
  { path : 'medical-history', loadChildren : './track-record/medical-history/medical-history.module#MedicalHistoryPageModule'},
  { path : 'medical-health-questionnaire', loadChildren : './track-record/medical-health-questionnaire/medical-health-questionnaire.module#MedicalHealthQuestionnairePageModule'},
  { path : 'allergies', loadChildren : './track-record/allergies/allergies.module#AllergiesPageModule' },
  { path : 'vital-sign', loadChildren : './track-record/vital-sign/vital-sign.module#VitalSignPageModule' },
  { path : 'female', loadChildren : './track-record/female/female.module#FemalePageModule' },
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
