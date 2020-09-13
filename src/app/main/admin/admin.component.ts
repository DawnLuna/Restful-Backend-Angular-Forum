import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService, AuthService, CacheService, User, Section } from '../../core'

@Component({
  selector: 'forum-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.sass']
})
export class AdminComponent implements OnInit {
  isSubmitting: boolean = false;
  sectionForm: FormGroup;
  isAddSectionCollapsed: boolean = true;
  isAddAdminCollapsed: boolean = true;
  sections: Section[] = [];

  alert: { type: string, message: string };
  closeAlert() {
    this.alert = undefined;
  }

  constructor(
    private api: ApiService,
    public auth: AuthService,
    public cache: CacheService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.sectionForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(64),
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(256),
      ])
    });
    this.loadSection();
  }

  loadSection() {
    this.api.getSections().subscribe(
      section => this.sections = section,
      err => this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` }
    );
  }

  addSection() {
    this.isSubmitting = true;
    this.api.addSection(this.sectionForm.value).subscribe(
      section => {
        //this.sections.push(section);
        this.alert = { type: 'success', message: `${section.title} has been added!` };
        this.sectionForm.reset();
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }, err => {
        this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
  }

  get section() {
    return this.sectionForm.controls;
  }

  removeSection(section: Section) {
    this.isSubmitting = true;
    this.alert = { type: 'danger', message: `Not Implemented` };
    setTimeout(() => { this.isSubmitting = false; }, 500);
    /**
    this.api.removeSection(section).subscribe(
      data => {
        this.alert = { type: 'success', message: data.message };
        this.loadSection();
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }, err => {
        this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
     */
  }

  removeAdmin(user: User) {
    this.isSubmitting = true;
    this.api.removeForumAdmin(user).subscribe(
      data => {
        this.alert = { type: 'success', message: data.message };
        this.cache.updateforum(data.forum);
        setTimeout(() => { this.isSubmitting = false; }, 500);
        if (user._id == this.auth.user._id) {
          this.router.navigateByUrl('/');
        }
      }, err => {
        this.alert = { type: 'danger', message: `${err.status} ${err.statusText}: ${err.error.message}` };
        setTimeout(() => { this.isSubmitting = false; }, 500);
      }
    );
  }

}
