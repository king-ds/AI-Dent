import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QuadrantThreePage } from './quadrant-three.page';

const routes: Routes = [
  {
    path: '',
    component: QuadrantThreePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QuadrantThreePageRoutingModule {}
