import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DiagnosisTreatmentplanPage } from './diagnosis-treatmentplan.page';

const routes: Routes = [
  {
    path: '',
    component: DiagnosisTreatmentplanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DiagnosisTreatmentplanPageRoutingModule {}
