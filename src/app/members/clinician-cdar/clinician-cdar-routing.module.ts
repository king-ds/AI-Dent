import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianCdarPage } from './clinician-cdar.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianCdarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianCdarPageRoutingModule {}
