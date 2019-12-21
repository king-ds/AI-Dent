import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorCdarPageRoutingModule } from './instructor-cdar-routing.module';

import { InstructorCdarPage } from './instructor-cdar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorCdarPageRoutingModule
  ],
  declarations: [InstructorCdarPage]
})
export class InstructorCdarPageModule {}
