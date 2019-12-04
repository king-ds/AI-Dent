import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorViewerPageRoutingModule } from './instructor-viewer-routing.module';

import { InstructorViewerPage } from './instructor-viewer.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorViewerPageRoutingModule
  ],
  declarations: [InstructorViewerPage]
})
export class InstructorViewerPageModule {}
