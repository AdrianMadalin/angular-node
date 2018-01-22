import {Component, OnInit} from '@angular/core';
import {ValidateService} from '../service/validate.service';
import {AuthService} from '../service/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  name: String;
  userName: String;
  email: String;
  password: String;

  constructor(private validateService: ValidateService,
              private authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.userName,
      email: this.email,
      password: this.password
    };

    if (!this.validateService.validateRegister(user)) {
      console.log('not all filled');
      return false;
    } else {
      console.log(`passed register`);
    }

    if (!this.validateService.validateEmail(user.email)) {
      console.log('please use a vaild email');
      return false;
    } else {
      console.log(`passed email`);
    }

    //  register user
    this.authService.registerUser(user).subscribe(data => {
      if (data) {
        console.log('user registered');
        this._router.navigate(['/login']);
      } else {
        console.log('something went wrong');
        this._router.navigate(['/register']);
      }
    });
  }
}
