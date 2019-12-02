import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorDashboardPage } from './instructor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorDashboardPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorDashboardPageRoutingModule {}
