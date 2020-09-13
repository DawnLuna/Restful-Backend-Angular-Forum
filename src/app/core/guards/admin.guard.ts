import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(
    public auth: AuthService,
    public router: Router
  ) { }

  canActivate(): boolean {
    if (!this.auth.isAuthenticated) {
      this.router.navigateByUrl('login');
      return false;
    }
    if (!this.auth.isForumAdmin) {
      this.router.navigateByUrl('');
      return false;
    }
    return true;
  }

}
