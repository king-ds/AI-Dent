import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorDashboardPage } from './instructor-dashboard.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorDashboardPage,
    children : [
      { path: 'instructor-track-records', loadChildren: '../instructor-track-records/instructor-track-records.module#InstructorTrackRecordsPageModule'},
      { path: 'instructor-profile', loadChildren:'../instructor-profile/instructor-profile.module#InstructorProfilePageModule' },
      { path: 'instructor-cdar', loadChildren:'../instructor-cdar/instructor-cdar.module#InstructorCdarPageModule' },
      {
        path: '',
        redirectTo: '/members/instructor-dashboard/instructor-track-records',
        pathMatch: 'full',
      }
    ]
  },
  {
    path: '',
    redirectTo: '/members/instructor-dashboard/instructor-track-records',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorDashboardPageRoutingModule {}
