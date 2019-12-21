import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorTrackRecordsPage } from './instructor-track-records.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorTrackRecordsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorTrackRecordsPageRoutingModule {}
