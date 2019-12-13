import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChildDentalChartPageRoutingModule } from './child-dental-chart-routing.module';

import { ChildDentalChartPage } from './child-dental-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChildDentalChartPageRoutingModule
  ],
  declarations: [ChildDentalChartPage]
})
export class ChildDentalChartPageModule {}
