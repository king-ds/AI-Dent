import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorSelectionPageRoutingModule } from './instructor-selection-routing.module';

import { InstructorSelectionPage } from './instructor-selection.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorSelectionPageRoutingModule
  ],
  declarations: [InstructorSelectionPage]
})
export class InstructorSelectionPageModule {}
