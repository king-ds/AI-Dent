import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'list',
    loadChildren: () => import('./list/list.module').then(m => m.ListPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registration-clinician',
    loadChildren: () => import('./registration-clinician/registration-clinician.module').then( m => m.RegistrationClinicianPageModule)
  },
  {
    path: 'registration-instructor',
    loadChildren: () => import('./registration-instructor/registration-instructor.module').then( m => m.RegistrationInstructorPageModule)
  },
  {
    path: 'registration-patient',
    loadChildren: () => import('./registration-patient/registration-patient.module').then( m => m.RegistrationPatientPageModule)
  },
  {
    path : 'members',
    canActivate : [AuthGuard],
    loadChildren : './members/member-routing.module#MemberRoutingModule'
  }
  // {
  //   path: 'clinician-dashboard',
  //   loadChildren: () => import('./members/clinician-dashboard/clinician-dashboard.module').then( m => m.ClinicianDashboardPageModule)
  // },
  // {
  //   path: 'instructor-dashboard',
  //   loadChildren: () => import('./members/instructor-dashboard/instructor-dashboard.module').then( m => m.InstructorDashboardPageModule)
  // },
  // {
  //   path: 'patient-dashboard',
  //   loadChildren: () => import('./members/patient-dashboard/patient-dashboard.module').then( m => m.PatientDashboardPageModule)
  // }

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
