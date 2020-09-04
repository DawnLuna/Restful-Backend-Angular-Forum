import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent, SectionComponent, ThreadComponent, ProfileComponent } from './main';

const routes: Routes = [
  { path: '', component: ForumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
