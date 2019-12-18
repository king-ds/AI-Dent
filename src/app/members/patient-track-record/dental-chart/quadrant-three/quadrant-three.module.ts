import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadrantThreePageRoutingModule } from './quadrant-three-routing.module';

import { QuadrantThreePage } from './quadrant-three.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadrantThreePageRoutingModule
  ],
  declarations: [QuadrantThreePage]
})
export class QuadrantThreePageModule {}
