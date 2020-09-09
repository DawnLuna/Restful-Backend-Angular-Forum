import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent, SectionComponent, ThreadComponent, ProfileComponent, AuthComponent } from './main';

const routes: Routes = [
  { path: 'section/:sid', component: SectionComponent },
  { path: 'thread/:tid', component: ThreadComponent },
  { path: 'profile/:uid', component: ProfileComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent },
  { path: '', component: ForumComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
