import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ComplaintPage } from './complaint.page';

const routes: Routes = [
  {
    path: '',
    component: ComplaintPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ComplaintPageRoutingModule {}
