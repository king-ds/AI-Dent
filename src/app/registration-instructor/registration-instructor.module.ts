import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RegistrationInstructorPageRoutingModule } from './registration-instructor-routing.module';

import { RegistrationInstructorPage } from './registration-instructor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    RegistrationInstructorPageRoutingModule
  ],
  declarations: [RegistrationInstructorPage]
})
export class RegistrationInstructorPageModule {}
