import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
// import { Observable } from "rxjs/Rx";
import { User } from './user.model';
import {BehaviorSubject} from "rxjs/Rx";
import {Config} from "./Config";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AuthService {

  private todos = new BehaviorSubject<any>(['sss']);
  todo = this.todos.asObservable();


  private url = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  registerUser(user: User) {
    const body: User = {
      email: user.email,
      password: user.password,
    };
    // var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.http.post(this.url + '/user/sign-up', body,{headers : httpOptions.headers});
  }

  userAuthentication(email, password) {
    const body: User = {
      email: email,
      password: password,
    };

    return this.http.post(this.url + '/user/sign-in', body, { headers: httpOptions.headers });
  }

  getCompanies() {
    return this.http.get(this.url + '/companies');
  }

  changeTodo(todo) {
    this.todos.next(todo)
  }

}
