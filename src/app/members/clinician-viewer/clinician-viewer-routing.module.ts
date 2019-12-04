import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ClinicianViewerPage } from './clinician-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: ClinicianViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClinicianViewerPageRoutingModule {}
