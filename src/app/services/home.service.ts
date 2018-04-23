import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from "rxjs/Rx";
import {HttpClient} from "@angular/common/http";
import {List} from "./list.model";
import {ApiService} from "./api.service";

@Injectable()
export class HomeService {

  private url = 'http://localhost:3000';

  private todo: ReplaySubject<any> = new ReplaySubject(1);
  private isLoadTodo = false;

  constructor(private apiService: ApiService) { }

  getCompanies() {
    return this.apiService.get(this.url + '/lists')
      .map(result => {
        this.setTodo(result.data);
        return result;
      });
  }

  removeCompany(id) {
    alert(id)
    return this.apiService.get(this.url + `/list/remove?_id=${id}`)
  }

  addCompany(list: List) {
    const body: List = {
      name: list.name
    };
    // var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.apiService.post(this.url + '/list/add', body)
      .map(res => {
        return res;
      })
  }
  
  updateList(id, name) {
    const body = {
      id: id,
      name: name
    };
    return this.apiService.post(this.url + '/list/update', body)
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
