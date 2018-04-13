import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';

import {TaskService} from "../services/task.service";

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css'],
  animations: [
    trigger('todos', [
      transition('* => *',[
        query(':enter', style({ opacity: 0 }), {optional: true}),

        query(':enter', stagger('300ms', [
          animate('.6s ease-in', keyframes([
            style({opacity: 0, transform: 'translateY(-75%)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 1, transform: 'translateY(0)',     offset: 1.0}),
          ]))]), {optional: true}),

        query(':leave', stagger('300ms', [
          animate('.6s ease-out', keyframes([
            style({opacity: 1, transform: 'translateY(0)', offset: 0}),
            style({opacity: .5, transform: 'translateY(35px)',  offset: 0.3}),
            style({opacity: 0, transform: 'translateY(-75%)',     offset: 1.0}),
          ]))]), {optional: true})
      ])
    ])
  ]
})

export class TaskComponent implements OnInit {

  private idList;
  private todo: object[];
  todoText: string= '';
  todos = [];
  itemCount: number = 0;
  private newTask;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService
  ) { }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        console.log('PARAMS', params);
        this.idList = params['id'];
      });

    this.taskService.getTasks(this.idList)
      .subscribe(res => {
        this.todos = res['data'];
      });
    this.itemCount = this.todos.length;
  }

  addItem() {
    this.taskService.addTask(this.idList, this.todoText)
      .subscribe(res => {
        this.todos.push(res['data']);
      });

    this.todoText = '';
    this.itemCount = this.todos.length;
    //this.taskService.changeTodo(this.todos);
  }

  removeItem(todo, i) {
    this.taskService.removeTask(todo._id)
      .subscribe(res => {
          console.log('RES', res)
        },
        error => {
          console.log('ERROR', error)
        });
    this.todos.splice(i, 1);
    //this.homeService.changeTodo(this.todos);
    this.itemCount = this.todos.length;
  }

}
