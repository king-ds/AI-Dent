import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TransferPatientPage } from './transfer-patient.page';

const routes: Routes = [
  {
    path: '',
    component: TransferPatientPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TransferPatientPageRoutingModule {}
