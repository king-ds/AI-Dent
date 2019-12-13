import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdultDentalChartPage } from './adult-dental-chart.page';

const routes: Routes = [
  {
    path: '',
    component: AdultDentalChartPage
  },
  { path : 'quadrant-one', loadChildren : './quadrant-one/quadrant-one.module#QuadrantOnePageModule' },
  { path : 'quadrant-two', loadChildren : './quadrant-two/quadrant-two.module#QuadrantTwoPageModule' },
  { path : 'quadrant-three', loadChildren : './quadrant-three/quadrant-three.module#QuadrantThreePageModule' },
  { path : 'quadrant-four', loadChildren : './quadrant-four/quadrant-four.module#QuadrantFourPageModule' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdultDentalChartPageRoutingModule {}
