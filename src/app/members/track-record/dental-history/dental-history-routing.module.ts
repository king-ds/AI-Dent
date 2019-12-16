import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DentalHistoryPage } from './dental-history.page';

const routes: Routes = [
  {
    path: '',
    component: DentalHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DentalHistoryPageRoutingModule {}
