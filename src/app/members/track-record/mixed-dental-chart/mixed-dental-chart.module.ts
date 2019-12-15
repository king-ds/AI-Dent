import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MixedDentalChartPageRoutingModule } from './mixed-dental-chart-routing.module';

import { MixedDentalChartPage } from './mixed-dental-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MixedDentalChartPageRoutingModule
  ],
  declarations: [MixedDentalChartPage]
})
export class MixedDentalChartPageModule {}
