import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VitalSignPageRoutingModule } from './vital-sign-routing.module';

import { VitalSignPage } from './vital-sign.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VitalSignPageRoutingModule
  ],
  declarations: [VitalSignPage]
})
export class VitalSignPageModule {}
