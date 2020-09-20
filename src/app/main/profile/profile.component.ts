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
  passwordForm: FormGroup;
  user: User;

  changingPassword = false;
  managingAdmin = false;
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
    private router: Router
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      if (routeParams.uid && this.isId(routeParams.uid)) {
        this.closeAlert();
        this.api.getUserById(routeParams.uid).subscribe(
          user => this.user = user,
          err => this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` }
        );
      } else {
        this.alert = { type: 'danger', message: `Error: invaild user id.` }
        return;
      }
    });

    this.passwordForm = new FormGroup({
      oldPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ]),
      newPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
  }

  isId(id: string) {
    return id.length == 12 || id.length == 24;
  }

  changePassword() {
    console.log('changing');
    this.isSubmitting = true;
    this.api.changePassword(this.passwordForm.value).subscribe(
      data => {
        let count = 5;
        this.alert = { type: 'success', message: `${data.message}\nPlease login with the new password.\nredirecting in ${count} seconds.` };
        this.user = null;
        this.auth.logout();
        setInterval(() => {
          count--;
          this.alert.message = `${data.message}\nPlease login with the new password.\nredirecting in ${count} seconds.`;
          if(count===0) {
            this.router.navigateByUrl('/user/login');
          }
        }, 1000);
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }, err => {
        this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
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
