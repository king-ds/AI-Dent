import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComplaintPageRoutingModule } from './complaint-routing.module';

import { ComplaintPage } from './complaint.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ComplaintPageRoutingModule
  ],
  declarations: [ComplaintPage]
})
export class ComplaintPageModule {}
