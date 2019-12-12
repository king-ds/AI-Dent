import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FemalePageRoutingModule } from './female-routing.module';

import { FemalePage } from './female.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FemalePageRoutingModule
  ],
  declarations: [FemalePage]
})
export class FemalePageModule {}
