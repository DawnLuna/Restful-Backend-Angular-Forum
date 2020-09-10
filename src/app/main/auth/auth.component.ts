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

  constructor(
    private api: ApiService,
    public router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    if (this.router.url === '/logout') {
      this.auth.logout();
      this.router.navigateByUrl('/');
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

    if (this.router.url === '/login') {
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
      error => {
        this.isSubmitting = false;
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
      error => {
        this.isSubmitting = false;
      }
    );
  }

}
