import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianProfilePage } from './clinician-profile.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianProfilePageRoutingModule {}
