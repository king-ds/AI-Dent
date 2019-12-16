import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OralAssessmentPage } from './oral-assessment.page';

const routes: Routes = [
  {
    path: '',
    component: OralAssessmentPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OralAssessmentPageRoutingModule {}
