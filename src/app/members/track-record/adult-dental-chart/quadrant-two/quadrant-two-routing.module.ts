import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuadrantTwoPage } from './quadrant-two.page';

const routes: Routes = [
  {
    path: '',
    component: QuadrantTwoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuadrantTwoPageRoutingModule {}
