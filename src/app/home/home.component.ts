import { Component, OnInit } from '@angular/core';
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";
import {HomeService} from "../services/home.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
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
export class HomeComponent implements OnInit {

  itemCount: number = 0;
  btnText: string = 'Add an Item';
  todoText: string= 'ExampleCompany';
  todos = [];

  constructor(
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getCompanies()
      .subscribe(res => {
        console.log("res", res);
        this.todos = res['data'];
      });
    //this.homeService.changeTodo(this.todos);
    this.itemCount = this.todos.length;
  }

  addItem() {
    this.homeService.addCompany({ name: this.todoText })
      .subscribe(
        () => {
        console.log('Company added');
      }, error => {
        console.log(error);
      });
    this.todos.push({ name: this.todoText });
    this.todoText = '';
    this.itemCount = this.todos.length;
    //this.homeService.changeTodo(this.todos);
  }

  removeItem(todo, i) {
    this.homeService.removeCompany(todo._id)
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

  showTask(task) {
    this.router.navigate(['/task'], { queryParams : { name : task.name } });
  }

}

