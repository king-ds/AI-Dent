import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
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
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
