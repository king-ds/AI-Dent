import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddPatientsPageRoutingModule } from './add-patients-routing.module';

import { AddPatientsPage } from './add-patients.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddPatientsPageRoutingModule
  ],
  declarations: [AddPatientsPage]
})
export class AddPatientsPageModule {}
