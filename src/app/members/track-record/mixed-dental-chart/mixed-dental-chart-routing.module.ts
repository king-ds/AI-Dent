import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MixedDentalChartPage } from './mixed-dental-chart.page';

const routes: Routes = [
  {
    path: '',
    component: MixedDentalChartPage
  },
  {
    path: 'quadrant-one',
    loadChildren: () => import('./quadrant-one/quadrant-one.module').then( m => m.QuadrantOnePageModule)
  },
  {
    path: 'quadrant-two',
    loadChildren: () => import('./quadrant-two/quadrant-two.module').then( m => m.QuadrantTwoPageModule)
  },
  {
    path: 'quadrant-three',
    loadChildren: () => import('./quadrant-three/quadrant-three.module').then( m => m.QuadrantThreePageModule)
  },
  {
    path: 'quadrant-four',
    loadChildren: () => import('./quadrant-four/quadrant-four.module').then( m => m.QuadrantFourPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MixedDentalChartPageRoutingModule {}
