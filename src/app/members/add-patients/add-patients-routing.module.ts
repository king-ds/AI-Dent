import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddPatientsPage } from './add-patients.page';

const routes: Routes = [
  {
    path: '',
    component: AddPatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddPatientsPageRoutingModule {}
