import { Component, OnInit } from '@angular/core';

import { ApiService, AuthService, CacheService, TitleService, Forum, Section } from '../../core'

@Component({
  selector: 'forum-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  sections: Section[] = [];

  constructor(
    private api: ApiService,
    public auth: AuthService,
    public cache: CacheService,
    private title: TitleService
  ) { }

  ngOnInit(): void {
    this.title.resetTitle();
    this.api.getSections().subscribe(
      sections => {
        this.sections = sections;
      },
      error => {
        console.log(error);
      }
    );
  }

}
