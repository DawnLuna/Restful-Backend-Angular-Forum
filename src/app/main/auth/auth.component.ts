import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

import { ApiService, AuthService } from '../../core'

@Component({
  selector: 'forum-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.sass']
})
export class AuthComponent implements OnInit {

  isSubmitting: boolean = false;
  registerForm: FormGroup;
  loginForm: FormGroup;
  form: { [key: string]: AbstractControl; };

  alert: { type: string, message: string };
  closeAlert() {
    this.alert = undefined;
  }

  constructor(
    private api: ApiService,
    public router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/user/logout') {
      this.auth.logout();
      this.router.navigateByUrl('');
      return;
    }
    if (this.auth.isAuthenticated) {
      this.router.navigateByUrl('/profile/' + this.auth.user._id);
      return;
    }

    this.registerForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20),
      ]),
      email: new FormControl('', [
        Validators.required,
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(100),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(20)
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(6),
        Validators.maxLength(20)
      ])
    });

    if (this.router.url === '/user/login') {
      this.form = this.loginForm.controls;
    } else {
      this.form = this.registerForm.controls;
    }
  }

  register() {
    this.isSubmitting = true;
    this.api.register(this.registerForm.value).subscribe(
      data => {
        this.auth.login(data.token);
        this.router.navigateByUrl('/');
      },
      err => {
        if(err.error.errors) {
          let msg:string = '';
          err.error.errors.forEach(element => {
            if(msg.length>0) {
              msg += `<br>
              `;
            }
            msg += element.msg;
          });
          this.alert = { type: 'danger', message: `${msg}` };
        } else {
          this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        }
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
  }

  login() {
    this.isSubmitting = true;
    this.api.login(this.loginForm.value).subscribe(
      data => {
        this.auth.login(data.token);
        this.router.navigateByUrl('/');
      },
      err => {
        this.alert = { type: 'danger', message: `${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
  }

}
