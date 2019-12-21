import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorTrackRecordsPageRoutingModule } from './instructor-track-records-routing.module';

import { InstructorTrackRecordsPage } from './instructor-track-records.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorTrackRecordsPageRoutingModule
  ],
  declarations: [InstructorTrackRecordsPage]
})
export class InstructorTrackRecordsPageModule {}
