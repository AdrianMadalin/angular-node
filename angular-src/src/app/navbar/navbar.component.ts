import { Component, OnInit } from '@angular/core';
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public isCollapsed = true;

  constructor(private _authService: AuthService,
              private _router: Router) { }

  ngOnInit() {
  }

  onLogoutClick() {
    this._authService.logout();
    this._router.navigate(['/']);
    console.log(`logged out`);
  }

}
