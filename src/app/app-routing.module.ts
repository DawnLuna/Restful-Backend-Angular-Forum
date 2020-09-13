import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent, SectionComponent, ThreadComponent, ProfileComponent, AuthComponent, AdminComponent } from './main';
import { AdminGuard, AuthGuard } from './core';

const routes: Routes = [
  { path: 'section/:sid', component: SectionComponent },
  { path: 'thread/:tid', component: ThreadComponent },
  {
    path: 'profile/:uid', component: ProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'register', component: AuthComponent },
  { path: 'login', component: AuthComponent },
  { path: 'logout', component: AuthComponent },
  {
    path: 'admin', component: AdminComponent,
    canActivate: [AdminGuard]
  },
  { path: '', component: ForumComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
