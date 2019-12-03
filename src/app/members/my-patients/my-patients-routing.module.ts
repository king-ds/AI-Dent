import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPatientsPage } from './my-patients.page';

const routes: Routes = [
  {
    path: '',
    component: MyPatientsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPatientsPageRoutingModule {}
