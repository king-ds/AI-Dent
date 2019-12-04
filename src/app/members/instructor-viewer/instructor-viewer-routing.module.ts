import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorViewerPage } from './instructor-viewer.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorViewerPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorViewerPageRoutingModule {}
