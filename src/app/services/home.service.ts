import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";
import {Company} from "./company.model";
import {ApiService} from "./api.service";

@Injectable()
export class HomeService {

  private url = 'http://localhost:3000';

  private todo: ReplaySubject<any> = new ReplaySubject(1);
  private isLoadTodo = false;

  constructor(private apiService: ApiService) { }

  getCompanies() {
    return this.apiService.get(this.url + '/companies')
      .map(result => {
        console.log("get comp serv data=", result);
        this.setTodo(result.data);
        return result;
      });
  }

  removeCompany(id) {
    return this.apiService.get(this.url + `/company/remove?_id=${id}`)
  }

  addCompany(company: Company) {
    const body: Company = {
      name: company.name
    };
    // var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.apiService.post(this.url + '/company/add', body)
      .map(res => {
        return res;
      })
  }

  setTodo(todo) {
    this.isLoadTodo = Boolean(todo);
    this.todo.next(todo);
  }

  getTodo(): Observable<any> {
    if (this.isLoadTodo) {
      return this.todo.asObservable();
    } else {
      return this.getCompanies()
        .map(result => {
          this.setTodo(result.data);
          return result.data;
        });
    }
  }

}
