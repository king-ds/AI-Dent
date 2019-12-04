import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClinicianViewerPageRoutingModule } from './clinician-viewer-routing.module';

import { ClinicianViewerPage } from './clinician-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClinicianViewerPageRoutingModule
  ],
  declarations: [ClinicianViewerPage]
})
export class ClinicianViewerPageModule {}
