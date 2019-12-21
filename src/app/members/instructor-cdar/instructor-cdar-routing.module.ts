import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorCdarPage } from './instructor-cdar.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorCdarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorCdarPageRoutingModule {}
