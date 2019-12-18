import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TreatmentRecordPageRoutingModule } from './treatment-record-routing.module';

import { TreatmentRecordPage } from './treatment-record.page';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    TreatmentRecordPageRoutingModule,
    NgxDatatableModule,
  ],
  declarations: [TreatmentRecordPage]
})
export class TreatmentRecordPageModule {}
