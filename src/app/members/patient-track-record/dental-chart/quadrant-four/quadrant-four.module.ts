import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadrantFourPageRoutingModule } from './quadrant-four-routing.module';

import { QuadrantFourPage } from './quadrant-four.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadrantFourPageRoutingModule
  ],
  declarations: [QuadrantFourPage]
})
export class QuadrantFourPageModule {}
