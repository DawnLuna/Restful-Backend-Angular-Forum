import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { AuthService, ApiService, CacheService, User } from '../../core';

@Component({
  selector: 'forum-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  changePassword: FormGroup;
  user: User;
  message: string = '';

  isSubmitting: boolean = false;

  alert: { type: string, message: string };
  closeAlert() {
    this.alert = undefined;
  }

  constructor(
    public auth: AuthService,
    private api: ApiService,
    public cache: CacheService,
    private activeRoute: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/profile') {
      this.api.getUserById(this.auth.user._id).subscribe(
        user => this.user = user,
        error => this.message = error.message
      );
    } else {
      this.activeRoute.params.subscribe(routeParams => {
        if (this.isId(routeParams.uid)) {
          this.api.getUserById(routeParams.uid).subscribe(
            user => this.user = user,
            error => this.message = error.message
          );
        } else {
          this.message = `invaild user id`;
          return;
        }
      });
    }

    this.changePassword = new FormGroup({
      oldpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      newpassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
  }

  isId(id: string) {
    return id.length == 12 || id.length == 24;
  }

  addForumAdmin() {
    this.isSubmitting = true;
    this.api.addForumAdmin(this.user).subscribe(
      data => {
        this.alert = { type: 'success', message: data.message };
        this.cache.updateforum(data.forum);
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }, err => {
        this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
  }

  removeForumAdmin() {
    this.api.removeForumAdmin(this.user).subscribe(
      data => {
        this.alert = { type: 'success', message: data.message };
        this.cache.updateforum(data.forum);
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }, err => {
        this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
  }

}
