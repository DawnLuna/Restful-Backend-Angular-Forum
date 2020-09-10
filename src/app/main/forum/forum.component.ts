import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService, AuthService, CacheService, TitleService, Forum, Section } from '../../core'

@Component({
  selector: 'forum-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  forum: Forum;
  sections: Section[] = [];
  isSubmitting: boolean = false;
  isAddSectionCollapsed: boolean = true;
  isAddAdminCollapsed: boolean = true;
  sectionForm: FormGroup;

  constructor(
    private api: ApiService,
    public auth: AuthService,
    private cache: CacheService,
    private title: TitleService
  ) { }

  ngOnInit(): void {
    this.forum = this.cache.forum;
    this.title.resetTitle();
    this.api.getSections().subscribe(
      sections => {
        this.sections = sections;
      },
      error => {
        console.log(error);
      }
    );

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
  }

  addSection() {
    this.isSubmitting = true;
    this.api.addSection(this.sectionForm.value).subscribe(
      section => {
        this.sections.push(section);
        this.sectionForm.reset();
        this.isSubmitting = false;
      }, err => {
        console.log(err);
        this.isSubmitting = false;
      }
    );
  }

  get isForumAdmin() {
    if (this.auth.isAuthenticated) {
      for (let i = 0; i < this.forum.admins.length; i++) {
        if (this.forum.admins[i]._id == this.auth.user._id) {
          return true;
        }
      }
      return false;
    }
    return false;
  }

}
