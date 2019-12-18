import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FemalePage } from './female.page';

const routes: Routes = [
  {
    path: '',
    component: FemalePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FemalePageRoutingModule {}
