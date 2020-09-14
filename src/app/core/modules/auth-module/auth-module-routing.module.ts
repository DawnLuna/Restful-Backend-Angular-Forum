import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthComponent } from '../../../main';

const routes: Routes = [
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthModuleRoutingModule { }
