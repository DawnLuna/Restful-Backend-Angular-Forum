import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ApiService, AuthService, TitleService, Thread, Reply } from '../../core'

@Component({
  selector: 'forum-thread',
  templateUrl: './thread.component.html',
  styleUrls: ['./thread.component.sass']
})
export class ThreadComponent implements OnInit {
  thread: Thread | null = null;
  replies: Reply[] | null = null;
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
      this.api.getThread(routeParams.tid).subscribe(
        data => {
          this.thread = data;
          this.title.setTitle(data.title);
        },
        error => {
          console.log(error);
        }
      );
      this.api.getReplies(routeParams.tid).subscribe(
        data => {
          this.replies = data;
        },
        error => {
          console.log(error);
        }
      );
    });
  }

  postReply(reply:Reply): void {
    this.replies.push(reply);
  }
}
