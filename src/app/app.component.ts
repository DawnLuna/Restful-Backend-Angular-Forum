import { Component } from '@angular/core';

import { ApiService, TitleService, CacheService } from './core';

@Component({
  selector: 'forum-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Restful-Backend-Angular-Forum';

  constructor(
    private api: ApiService,
    private titleSer: TitleService,
    private cache: CacheService
  ) {
    api.getForum().subscribe(
      forum => {
        titleSer.setDefaultTitle(forum);
        cache.updateforum(forum);
      },
      error => {
        console.log(error);
      }
    );
  }

}
