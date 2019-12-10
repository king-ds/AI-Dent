import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalHistoryPage } from './medical-history.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalHistoryPageRoutingModule {}
