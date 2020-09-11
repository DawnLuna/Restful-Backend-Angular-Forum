import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { ApiService, AuthService, CacheService } from '../../core'

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

  constructor(
    private api: ApiService,
    public cache: CacheService
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
  }

  addSection() {
    this.isSubmitting = true;
    this.api.addSection(this.sectionForm.value).subscribe(
      section => {
        //this.sections.push(section);
        this.sectionForm.reset();
        this.isSubmitting = false;
      }, err => {
        console.log(err);
        this.isSubmitting = false;
      }
    );
  }

  get section() {
    return this.sectionForm.controls;
  }

}
