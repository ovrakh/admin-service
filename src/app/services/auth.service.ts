import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from "rxjs/Rx";
import { User } from './user.model';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      email: user.email,
      password: user.password,
    };
    alert(body.email);
    var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.url + '/user/sign-up', body,{headers : reqHeader});
  }

}
