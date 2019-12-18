import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuadrantFourPage } from './quadrant-four.page';

const routes: Routes = [
  {
    path: '',
    component: QuadrantFourPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuadrantFourPageRoutingModule {}
