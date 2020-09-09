import { Injectable } from '@angular/core';

import { JwtHelperService } from '@auth0/angular-jwt';

import { User } from '..';
import { CacheService } from './cache.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  token: string;
  user: User;
  jwth: JwtHelperService = new JwtHelperService();

  constructor(
    private cache: CacheService
  ) {
    this.token = cache.token;
    this.decodeUser();
  }

  decodeUser() {
    if (!this.jwth.isTokenExpired(this.token)) {
      let decoded = this.jwth.decodeToken(this.token);
      this.user = {
        _id: decoded.uid,
        username: decoded.username
      }
    } else {
      this.user = null;
    }
  }

  login(token:string) {
    this.cache.updateToken(token);
    this.token = token;
    this.decodeUser();
  }

  logout() {
    this.cache.clearToken();
    this.user = null;
    this.token = null;
  }

  get isAuthenticated(): boolean {
    return !!this.user;
  }
}
