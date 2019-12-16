import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OralAssessmentPageRoutingModule } from './oral-assessment-routing.module';

import { OralAssessmentPage } from './oral-assessment.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OralAssessmentPageRoutingModule
  ],
  declarations: [OralAssessmentPage]
})
export class OralAssessmentPageModule {}
