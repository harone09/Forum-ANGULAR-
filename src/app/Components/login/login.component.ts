import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { User } from 'src/app/Models/User';
import { UserService } from "../../services/User/user.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {

  /////////////////////////////

  public loginForm: FormGroup;
  public registerForm: FormGroup;

  /////////////////////////////////

  errorMessage = "username ou password est incorrect !";
  isError = false;
  constructor(private userService: UserService, public router: Router) { }

  ////////////////////////////////


  usr: User;
  public signIn(): void {
    const cemail = this.loginForm.get("email").value;
    const cpassword = this.loginForm.get("password").value;
    this.usr = { email: cemail, password: cpassword, login: "", phone: "", name: "", id: 0, role: "" };
    //console.log(this.usr);
    this.userService.checkUser(this.usr).subscribe(m => {
      // console.log(m);
      if (m == null) {
        this.isError = true;

      }
      //this.isError = false;
      localStorage.setItem('Session', JSON.stringify(m));
      this.router.navigate(["/"]);
      return;
    });

  }

  //////////////////s/////////////


  public register(): void {
    this.usr = {
      email: this.registerForm.get("email").value,
      password: this.registerForm.get("password").value,
      login: this.registerForm.get("login").value,
      phone: this.registerForm.get("phone").value,
      name: this.registerForm.get("name").value,
      id: 0,
      role: this.registerForm.get("role").value
    };

    this.userService.registerUser(this.usr).subscribe(m => {
      console.log(m);

      //this.isError = false;
      localStorage.setItem('Session', JSON.stringify(m));
      this.router.navigate(["/"]);
      return;
    });

  }



  ////////////////////////////////

  disabled(): boolean {
    return (
      this.loginForm.get("email").value === "" ||
      this.loginForm.get("password").value === ""
    );
  }

  /////////////////////////////////////
  checkSession(): boolean {
    //console.log(localStorage.getItem('Session'));

    return (localStorage.getItem('Session') != null);
  }


  /////////////////////////////////////

  ngOnInit() {
    if (localStorage.getItem('Session') != null) {
      this.router.navigate(["/"]);
    }

    this.loginForm = new FormGroup({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
    });


    this.registerForm = new FormGroup({
      'email': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required),
      'role': new FormControl("", Validators.required),
      'name': new FormControl("", Validators.required),
      'login': new FormControl("", Validators.required),
      'phone': new FormControl("", Validators.required),
    });


  }
}
