import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SocialHistoryPage } from './social-history.page';

const routes: Routes = [
  {
    path: '',
    component: SocialHistoryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SocialHistoryPageRoutingModule {}
