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
  { path : 'child-dental-chart', loadChildren : './track-record/child-dental-chart/child-dental-chart.module#ChildDentalChartPageModule' },
  { path : 'adult-dental-chart', loadChildren : './track-record/adult-dental-chart/adult-dental-chart.module#AdultDentalChartPageModule' },
  { path : 'mixed-dental-chart', loadChildren : './track-record/mixed-dental-chart/mixed-dental-chart.module#MixedDentalChartPageModule' },
  { path : 'personal-information', loadChildren : './track-record/personal-information/personal-information.module#PersonalInformationPageModule' },
  { path : 'oral-assessment', loadChildren : './track-record/oral-assessment/oral-assessment.module#OralAssessmentPageModule' },
  { path : 'social-history', loadChildren : './track-record/social-history/social-history.module#SocialHistoryPageModule' },
  { path : 'dental-history', loadChildren : './track-record/dental-history/dental-history.module#DentalHistoryPageModule' },
  { path : 'occlusion', loadChildren : './track-record/occlusion/occlusion.module#OcclusionPageModule' },
  { path : 'gingiva', loadChildren : './track-record/gingiva/gingiva.module#GingivaPageModule' },
  { path : 'treatment-record', loadChildren : './track-record/treatment-record/treatment-record.module#TreatmentRecordPageModule' },
  { path : 'patient-personal-information', loadChildren : './patient-track-record/personal-information/personal-information.module#PersonalInformationPageModule' },
  {
    path: 'clinician-viewer',
    loadChildren: () => import('./clinician-viewer/clinician-viewer.module').then( m => m.ClinicianViewerPageModule)
  },
  {
    path: 'instructor-viewer',
    loadChildren: () => import('./instructor-viewer/instructor-viewer.module').then( m => m.InstructorViewerPageModule)
  },
  {
    path: 'patient-complaint',
    loadChildren: () => import('./patient-track-record/complaint/complaint.module').then( m => m.ComplaintPageModule)
  },
  {
    path: 'patient-vital-sign',
    loadChildren: () => import('./patient-track-record/vital-sign/vital-sign.module').then( m => m.VitalSignPageModule)
  },
  {
    path: 'patient-medical-history',
    loadChildren: () => import('./patient-track-record/medical-history/medical-history.module').then( m => m.MedicalHistoryPageModule)
  },
  {
    path: 'patient-medical-health-questionnaire',
    loadChildren: () => import('./patient-track-record/medical-health-questionnaire/medical-health-questionnaire.module').then( m => m.MedicalHealthQuestionnairePageModule)
  },
  {
    path: 'patient-allergies',
    loadChildren: () => import('./patient-track-record/allergies/allergies.module').then( m => m.AllergiesPageModule)
  },
  {
    path: 'patient-dental-chart',
    loadChildren: () => import('./patient-track-record/dental-chart/dental-chart.module').then( m => m.DentalChartPageModule)
  },
  {
    path: 'patient-oral-assessment',
    loadChildren: () => import('./patient-track-record/oral-assessment/oral-assessment.module').then( m => m.OralAssessmentPageModule)
  },
  {
    path: 'patient-social-history',
    loadChildren: () => import('./patient-track-record/social-history/social-history.module').then( m => m.SocialHistoryPageModule)
  },
  {
    path: 'patient-dental-history',
    loadChildren: () => import('./patient-track-record/dental-history/dental-history.module').then( m => m.DentalHistoryPageModule)
  },
  {
    path: 'patient-occlusion',
    loadChildren: () => import('./patient-track-record/occlusion/occlusion.module').then( m => m.OcclusionPageModule)
  },
  {
    path: 'patient-gingiva',
    loadChildren: () => import('./patient-track-record/gingiva/gingiva.module').then( m => m.GingivaPageModule)
  },












];

@NgModule({
  imports : [RouterModule.forChild(routes)],
  exports : [RouterModule]
})
export class MemberRoutingModule { }