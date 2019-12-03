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
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
