import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthService {
  authToken: any;
  user: any;

  constructor(private _http: HttpClient) {
  }

  registerUser(user) {
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://127.0.0.1:8080/users/register', user, {headers: headers}).map(res => res);
  }

  loginUser(user){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this._http.post('http://127.0.0.1:8080/users/authenticate', user, {headers: headers}).map(res => res);
  }

  getProfile(){
    this.loadToken();
    let headers = new HttpHeaders().append('Authorization', this.authToken).append('Content-Type', 'application/json');
    return this._http.get('http://127.0.0.1:8080/users/profile', {headers: headers}).map(res => res);
  }

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  };

  loadToken() {
    console.log(this.authToken);    //undefined here
    this.authToken = localStorage.getItem('id_token');
    console.log(this.authToken)     // correct token here
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
