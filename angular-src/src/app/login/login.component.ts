import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userName: String;
  password: String;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  onLoginSubmit() {
    const user = {
      username: this.userName,
      password: this.password
    };

    this._authService.loginUser(user).subscribe(data =>{
      console.log(data);
      if(data.success) {
        this._authService.storeUserData(data.token, data.user);
        this._router.navigate(['/']);
      } else {
        this._router.navigate(['/login']);
      }
    });
  }
}
