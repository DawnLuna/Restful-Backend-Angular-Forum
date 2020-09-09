import { Component, OnInit } from '@angular/core';

import { ApiService, CacheService, TitleService, Forum, Section } from '../../core'

@Component({
  selector: 'forum-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.sass']
})
export class ForumComponent implements OnInit {

  forum: Forum;
  sections: Section[] = [];

  constructor(
    private api: ApiService,
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
  }

}
