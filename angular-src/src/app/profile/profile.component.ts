import {Component, OnInit} from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user = {};

  constructor(private _authService: AuthService,
              private _router: Router) {
  }

  ngOnInit() {
    this._authService.getProfile().subscribe(profile => {
      this.user = profile.user;
      console.log(this.user)
      this._router.navigate(['/profile'])
    }, err => {
      console.log(`Error`, err);      // IT GOES STRAIGHT HERE
      return false;
    });
  }


}
