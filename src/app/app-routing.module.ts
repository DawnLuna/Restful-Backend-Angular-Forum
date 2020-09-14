import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForumComponent, SectionComponent, ThreadComponent, ProfileComponent } from './main';
import { AuthGuard } from './core';

const routes: Routes = [
  { path: 'section/:sid', component: SectionComponent },
  { path: 'thread/:tid', component: ThreadComponent },
  { path: 'user', loadChildren: () => import('./core/modules/auth-module/auth-module.module').then(m => m.AuthModuleModule) },
  { path: 'profile', loadChildren: () => import('./core/modules/profile-module/profile-module.module').then(m => m.ProfileModuleModule) },
  { path: 'admin', loadChildren: () => import('./core/modules/admin-module/admin-module.module').then(m => m.AdminModule) },
  { path: '', component: ForumComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
