import { Injectable } from '@angular/core';

import { Forum } from '..';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public forum: Forum;
  public token: string;

  constructor() {
    this.loadForum();
    this.loadToken();
  }

  loadForum(): void {
    this.forum = JSON.parse(localStorage.getItem('forum'));
  }

  saveForum(): void {
    localStorage.setItem('forum', JSON.stringify(this.forum));
  }

  updateforum(forum: Forum) {
    this.forum = forum;
    this.saveForum();
  }

  clearToken(): void {
    localStorage.removeItem('token');
  }

  loadToken(): void {
    this.token = localStorage.getItem('token');
  }

  saveToken(): void {
    localStorage.setItem('token', this.token);
  }

  updateToken(token: string) {
    this.token = token;
    this.saveToken();
  }
}
