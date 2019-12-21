import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { InstructorSelectionPage } from './instructor-selection.page';

const routes: Routes = [
  {
    path: '',
    component: InstructorSelectionPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstructorSelectionPageRoutingModule {}
