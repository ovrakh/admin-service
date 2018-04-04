import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Subject, Observable, ReplaySubject} from "rxjs/Rx";

import { ApiService } from "./api.service";
import { User } from './user.model';
import { Company } from './company.model';

@Injectable()
export class AuthService {

  private url = 'http://localhost:3000';

  private user: ReplaySubject<any> = new ReplaySubject(1);
  private isLoadUser = false;

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  getUsers() {
    return this.apiService.get(this.url + '/users')
      .map(result => {
        console.log("get comp serv data=", result);
        this.setUser(result.data);
        return result;
      });
  }

  asUser(token) {
    return this.apiService.get(this.url + '/user')
      .map(result => {
        console.log("TOKEN EXP", result);
        //this.setUser(result.data);
        return result.data.success;
      });
  }

  registerUser(email, password) {
    const body: User = {
      email: email,
      password: password,
    };
    console.log('BODY', body)
    // var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.apiService.post(this.url + '/user/sign-up', body);
  }

  userAuthentication(email, password) { 
    const body: User = {
      email: email,
      password: password,
    };

    return this.apiService.post(this.url + '/user/sign-in', body);
  }

  setUser(user) {
    this.isLoadUser = Boolean(user);
    this.user.next(user);
  }

  getUser(): Observable<any> {
    if (this.isLoadUser) {
      return this.user.asObservable();
    } else {
      return this.getUsers()
        .map(result => {
          this.setUser(result.data);
          return result.data;
        });
    }
  }

  isEmailRegistered(email: string): Observable<any> {
    return this.apiService.get(`${this.url}/user/check?email=${email}`);
  }

}
