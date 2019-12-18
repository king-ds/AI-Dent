import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedicalHealthQuestionnairePage } from './medical-health-questionnaire.page';

const routes: Routes = [
  {
    path: '',
    component: MedicalHealthQuestionnairePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MedicalHealthQuestionnairePageRoutingModule {}
