import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MedicalHealthQuestionnairePageRoutingModule } from './medical-health-questionnaire-routing.module';

import { MedicalHealthQuestionnairePage } from './medical-health-questionnaire.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MedicalHealthQuestionnairePageRoutingModule
  ],
  declarations: [MedicalHealthQuestionnairePage]
})
export class MedicalHealthQuestionnairePageModule {}
