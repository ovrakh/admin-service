import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs/Rx";

import { ApiService } from "./api.service";
import { User } from './user.model';
import { Company } from './company.model';


@Injectable()
export class AuthService {

  private todo = new Subject<any>();


  private url = 'http://localhost:3000';

  constructor(private http: HttpClient,
              private apiService: ApiService) { }

  getCompanies() {
    return this.apiService.get(this.url + '/companies');
  }

  removeCompany(id) {
    return this.apiService.get(this.url + `/company/remove?_id=${id}`)
  }

  registerUser(user: User) {
    const body: User = {
      email: user.email,
      password: user.password,
    };
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

  addCompany(company: Company) {
    const body: Company = {
      name: company.name
    };
    // var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.apiService.post(this.url + '/company/add', body);
  }

  changeTodo(todo) {
    this.todo.next(todo)
  }
  
  getTodo() {
    return this.todo;
  }

}
