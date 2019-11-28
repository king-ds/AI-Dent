import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegistrationInstructorPage } from './registration-instructor.page';

const routes: Routes = [
  {
    path: '',
    component: RegistrationInstructorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RegistrationInstructorPageRoutingModule {}
