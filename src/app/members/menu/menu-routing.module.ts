import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'clinician-dashboard',
        loadChildren: '../clinician-dashboard/clinician-dashboard.module#ClinicianDashboardPageModule',

      },
      {
        path: 'instructor-viewer',
        loadChildren: '../instructor-viewer/instructor-viewer.module#InstructorViewerPageModule',
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
