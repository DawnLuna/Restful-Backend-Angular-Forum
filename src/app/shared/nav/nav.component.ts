import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'forum-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  collapsed:boolean = true;

  constructor() { }

  ngOnInit(): void {
  }

}
