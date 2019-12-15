import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadrantTwoPageRoutingModule } from './quadrant-two-routing.module';

import { QuadrantTwoPage } from './quadrant-two.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadrantTwoPageRoutingModule
  ],
  declarations: [QuadrantTwoPage]
})
export class QuadrantTwoPageModule {}
