import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Models/User';
import { UserService } from 'src/app/services/User/user.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  me: User;

  constructor(private userService: UserService, public router: Router) {

  }

  ngOnInit(): void {
    if (localStorage.getItem('Session') == null) {
      this.router.navigate(["/"]);
    }
    this.me = JSON.parse(localStorage.getItem('Session'));

  }

  editUser = () => {
    console.log(this.me);
    this.userService.editUser(this.me).subscribe(m => {

      localStorage.setItem('Session', JSON.stringify(m));
      this.me = JSON.parse(localStorage.getItem('Session'));

    })
  }

}
