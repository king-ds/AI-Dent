import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GingivaPageRoutingModule } from './gingiva-routing.module';

import { GingivaPage } from './gingiva.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GingivaPageRoutingModule
  ],
  declarations: [GingivaPage]
})
export class GingivaPageModule {}
