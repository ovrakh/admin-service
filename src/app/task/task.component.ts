import {Component, OnInit, Inject} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import { trigger,style,transition,animate,keyframes,query,stagger } from '@angular/animations';
import { DragulaService } from 'ng2-dragula/ng2-dragula';

import {TaskService} from "../services/task.service";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";

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

  msg = '';
  private idList;
  private nameList;
  private todo: object[];
  todoText: string= '';
  todos = [];
  itemCount: number = 0;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private taskService: TaskService,
    public dialog: MatDialog,
    private dragula: DragulaService
  ) {
    this.dragula.setOptions('bag-items', {
      revertOnSpill: true
    });
  }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        console.log('PARAMS', params);
        this.idList = params['id'];
        this.nameList = params['name'];
      });

    this.taskService.getTasks(this.idList)
      .subscribe(res => {
        this.todos = res['data'];
      });
    this.itemCount = this.todos.length;

    /*this.dragula
      .drag
      .subscribe(value => {
        this.msg = `Dragging the ${ value[1].innerText }!`;
        console.log('dragvalue', value)
      });*/

    this.dragula
      .drop
      .subscribe(value => {
        this.msg = `Dropped the ${ value[1].innerText }!`;
        console.log('id', value[1].id);
        console.log('stage', value[2].id)
        this.taskService.updateStage(value[1].id, value[2].id)
          .subscribe(res => {
          });

        setTimeout(() => {
          this.msg = '';
        }, 1000);
      });
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
        },
        error => {
          console.log('ERROR', error)
        });
    this.todos.splice(i, 1);
    //this.homeService.changeTodo(this.todos);
    this.itemCount = this.todos.length;
  }

  openDialog(todo, i): void {
    let dialogRef = this.dialog.open(EditTask, {
      width: '250px',
    });

    dialogRef.afterClosed()
      .subscribe(task => {
        this.taskService.updateTask(todo._id, task)
          .subscribe(res => {
            this.taskService.getTasks(this.idList)
              .subscribe(res => {
                this.todos = res['data'];
              });
            this.itemCount = this.todos.length;
          });
    });
  }

  taskByStage(stage) {
    let todo = [];
    //console.log(this.todos)
    this.todos.forEach(item => {
      if (item.stage && item.stage === stage) {
        todo.push(item);
      }
    });
    return todo;
  }

}

@Component({
  selector: 'edit-task',
  templateUrl: 'edit-task.html',
})
export class EditTask {

  private taskText;

  constructor(
    public dialogRef: MatDialogRef<EditTask>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
