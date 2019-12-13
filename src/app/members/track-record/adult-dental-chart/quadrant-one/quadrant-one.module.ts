import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QuadrantOnePageRoutingModule } from './quadrant-one-routing.module';

import { QuadrantOnePage } from './quadrant-one.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QuadrantOnePageRoutingModule
  ],
  declarations: [QuadrantOnePage]
})
export class QuadrantOnePageModule {}
