import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorDetailsPage } from './instructor-details.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorDetailsPageRoutingModule {}
