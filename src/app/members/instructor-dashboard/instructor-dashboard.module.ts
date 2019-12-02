import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InstructorDashboardPageRoutingModule } from './instructor-dashboard-routing.module';

import { InstructorDashboardPage } from './instructor-dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InstructorDashboardPageRoutingModule
  ],
  declarations: [InstructorDashboardPage]
})
export class InstructorDashboardPageModule {}
