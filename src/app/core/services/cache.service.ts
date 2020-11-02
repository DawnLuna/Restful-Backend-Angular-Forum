import { Injectable } from '@angular/core';

import { Forum } from '..';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  public forumData: Forum;
  public token: string;

  constructor() {
    this.loadForum();
    this.loadToken();
  }

  get forum() {
    return this.forumData;
  }

  loadForum(): void {
    this.forumData = JSON.parse(localStorage.getItem('forum'));
  }

  saveForum(): void {
    localStorage.setItem('forum', JSON.stringify(this.forumData));
  }

  updateforum(forum: Forum) {
    this.forumData = forum;
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
