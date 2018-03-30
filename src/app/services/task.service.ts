import { Injectable } from '@angular/core';
import {ReplaySubject} from "rxjs/Rx";

@Injectable()
export class TaskService {
  
  private users: ReplaySubject<any> = new ReplaySubject(1);
  private isLoadUsers = false;

  constructor() { }

}
