import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Forum } from '..';

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  private name:string;
  private shortDescr:string; 

  constructor(private title: Title) { }

  setDefaultTitle(forum:Forum) {
    this.name = forum.name;
    this.shortDescr = forum.shortDescription;
    this.resetTitle();
  }

  resetTitle() {
    this.title.setTitle(`${this.name} - ${this.shortDescr}`);
  }

  setTitle(t:string) {
    this.title.setTitle(`${t} - ${this.name}`);
  }
}
