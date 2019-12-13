import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdultDentalChartPageRoutingModule } from './adult-dental-chart-routing.module';

import { AdultDentalChartPage } from './adult-dental-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdultDentalChartPageRoutingModule
  ],
  declarations: [AdultDentalChartPage]
})
export class AdultDentalChartPageModule {}
