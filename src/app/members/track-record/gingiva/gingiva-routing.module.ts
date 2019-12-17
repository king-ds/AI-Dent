import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GingivaPage } from './gingiva.page';

const routes: Routes = [
  {
    path: '',
    component: GingivaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GingivaPageRoutingModule {}
