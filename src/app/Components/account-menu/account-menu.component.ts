import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account-menu',
  templateUrl: './account-menu.component.html',
  styleUrls: ['./account-menu.component.css']
})
export class AccountMenuComponent implements OnInit {
  me: User;

  constructor(public router: Router) { }

  ngOnInit(): void {
    if (localStorage.getItem('Session') == null) {
      this.router.navigate(["/"]);
    }
    this.me = JSON.parse(localStorage.getItem('Session'));
  }

}
