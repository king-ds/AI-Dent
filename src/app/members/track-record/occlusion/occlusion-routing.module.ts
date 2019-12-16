import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OcclusionPage } from './occlusion.page';

const routes: Routes = [
  {
    path: '',
    component: OcclusionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OcclusionPageRoutingModule {}
