import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationPatientPage } from './registration-patient.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationPatientPageRoutingModule {}
