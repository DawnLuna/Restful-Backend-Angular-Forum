import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminComponent } from '../../../main';
import { AdminGuard } from '../..';

const routes: Routes = [{
  path: '', component: AdminComponent,
  canActivate: [AdminGuard]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
