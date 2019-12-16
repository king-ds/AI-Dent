import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OcclusionPageRoutingModule } from './occlusion-routing.module';

import { OcclusionPage } from './occlusion.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OcclusionPageRoutingModule
  ],
  declarations: [OcclusionPage]
})
export class OcclusionPageModule {}
