import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChildDentalChartPage } from './child-dental-chart.page';

const routes: Routes = [
  {
    path: '',
    component: ChildDentalChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChildDentalChartPageRoutingModule {}
