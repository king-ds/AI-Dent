import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorProfilePage } from './instructor-profile.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorProfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorProfilePageRoutingModule {}
