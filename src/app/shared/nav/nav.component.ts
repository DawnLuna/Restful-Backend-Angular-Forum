import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../core'
@Component({
  selector: 'forum-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.sass']
})
export class NavComponent implements OnInit {
  collapsed:boolean = true;

  constructor(
    public auth: AuthService
  ) { }

  ngOnInit(): void {
  }

}
