import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TreatmentRecordPage } from './treatment-record.page';

const routes: Routes = [
  {
    path: '',
    component: TreatmentRecordPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TreatmentRecordPageRoutingModule {}
