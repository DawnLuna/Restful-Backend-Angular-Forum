import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

import { Forum, Section, Thread, Reply, User } from '..';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private endpoint: string = environment.forumApiEndpoint;

  constructor(
    private http: HttpClient,
    private auth: AuthService
  ) { }

  getForum(): Observable<Forum> {
    return this.http.get<Forum>(`${this.endpoint}`);
  }

  addForumAdmin(user: User): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.post<any>(`${this.endpoint}admin/`, user, httpOptions);
  }

  removeForumAdmin(user: User): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.delete<any>(`${this.endpoint}admin/${user._id}/${user.username}`, httpOptions);
  }

  addSection(section: Section): Observable<Section> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.post<Section>(`${this.endpoint}admin/section/`, section, httpOptions);
  }

  removeSection(section: Section): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.delete<any>(`${this.endpoint}admin/section/${section._id}`, httpOptions);
  }

  getSection(sid: string): Observable<Section> {
    return this.http.get<Section>(`${this.endpoint}section/${sid}`);
  }

  getSections(): Observable<Section[]> {
    return this.http.get<Section[]>(`${this.endpoint}section`);
  }

  getThreads(sid: string): Observable<Thread[]> {
    return this.http.get<Thread[]>(`${this.endpoint}threads/${sid}`);
  }

  postThread(sid: string, thread: Thread): Observable<Thread> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.post<Thread>(`${this.endpoint}section/${sid}`, thread, httpOptions);
  }

  getThread(tid: string): Observable<Thread> {
    return this.http.get<Thread>(`${this.endpoint}thread/${tid}`);
  }

  getReplies(tid: string): Observable<Reply[]> {
    return this.http.get<Reply[]>(`${this.endpoint}getreply/${tid}`);
  }

  postReply(tid: string, reply: Reply): Observable<Reply> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.post<Reply>(`${this.endpoint}thread/${tid}`, reply, httpOptions);
  }

  //user related
  getUserById(uid: string): Observable<User> {
    return this.http.get<User>(`${this.endpoint}user/${uid}`);
  }

  register(body: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}user/register`, body);
  }

  login(body: User): Observable<any> {
    return this.http.post<any>(`${this.endpoint}user/login`, body);
  }

  changePassword(body: User): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': this.auth.token
      })
    };
    return this.http.put<any>(`${this.endpoint}user/password`, body, httpOptions);
  }

}
