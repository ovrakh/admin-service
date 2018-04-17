import { Injectable } from '@angular/core';
import {ReplaySubject, Observable} from "rxjs/Rx";
import {ApiService} from "./api.service";

@Injectable()
export class TaskService {

  private todo: ReplaySubject<any> = new ReplaySubject(1);
  private isLoadTodo = false;
  private url = 'http://localhost:3000';

  constructor(private apiService: ApiService) { }

  getTasks(id) {
    return this.apiService.get(`${this.url}/task/list?idList=${id}`)
      .map(result => {
        //console.log("get comp serv data tasks=", result);
        this.setTodo(result.data);
        return result;
      });
  }

    addTask(id, text) {
    const body= {
      idList: id,
      task: text
    };
    // var reqHeader = new HttpHeaders({'No-Auth':'True'});
    return this.apiService.post(this.url + '/task/add', body)
      .map(res => {
        return res;
      })
  }

  removeTask(id) {
    return this.apiService.get(this.url + `/task/remove?_id=${id}`)
  }

  updateTask(id, text) {
    const body= {
      _id: id,
      task: text
    };
    return this.apiService.post(this.url + '/task/update', body)
      .map(res => {
        //this.getTodo(res['data']['id'])
        return res;
      })
  }

  updateStage(id, stage) {
    const body= {
      _id: id,
      stage: stage
    };
    return this.apiService.post(this.url + '/task/stage/update', body)
      .map(res => {
        //this.getTodo(res['data']['id'])
        return res;
      })
  }


  setTodo(todo) {
    this.isLoadTodo = Boolean(todo);
    this.todo.next(todo);
  }

  getTodo(id): Observable<any> {
    if (this.isLoadTodo) {
      return this.todo.asObservable();
    } else {
      return this.getTasks(id)
        .map(result => {
          this.setTodo(result.data);
          return result.data;
        });
    }
  }

}
