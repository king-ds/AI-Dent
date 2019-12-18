import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientTrackRecordsPage } from './patient-track-records.page';

const routes: Routes = [
  {
    path: '',
    component: PatientTrackRecordsPage
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientTrackRecordsPageRoutingModule {}
