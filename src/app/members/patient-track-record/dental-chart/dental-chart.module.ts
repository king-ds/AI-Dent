import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DentalChartPageRoutingModule } from './dental-chart-routing.module';

import { DentalChartPage } from './dental-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DentalChartPageRoutingModule
  ],
  declarations: [DentalChartPage]
})
export class DentalChartPageModule {}
