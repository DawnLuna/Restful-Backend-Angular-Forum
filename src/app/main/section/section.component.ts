import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService, AuthService, TitleService, Section, Thread } from '../../core'

@Component({
  selector: 'forum-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.sass']
})
export class SectionComponent implements OnInit {
  section: Section | null = null;
  threads: Thread[] | null = null;
  pageSize:number = 20;
  page:number = 1;
 
  constructor(
    private activeRoute: ActivatedRoute,
    private title: TitleService,
    private api: ApiService,
    public auth: AuthService
  ) { }

  ngOnInit(): void {
    this.activeRoute.params.subscribe(routeParams => {
      this.api.getSection(routeParams.sid).subscribe(
        data => {
          this.section = data;
          this.title.setTitle(data.title);
          this.section.description
        },
        error => {
          console.log(error);
        }
      );
      this.api.getThreads(routeParams.sid).subscribe(
        data => {
          this.threads = data;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  postThread(thread:Thread) {
    this.section.threadCount += 1;
    this.threads.unshift(thread);
  }

}
