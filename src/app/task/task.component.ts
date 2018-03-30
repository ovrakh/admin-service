import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";

import { HomeService } from '../services/home.service';
import { Subject } from "rxjs/Rx";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-task',
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})

export class TaskComponent implements OnInit {

  private sub;
  private companyName;
  private todo: object[];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private homeService: HomeService
  ) { }

  ngOnInit() {

    this.route
      .queryParams
      .subscribe(params => {
        console.log('PARAMS', params);
        this.companyName = params['name'];
        this.homeService.getTodo()
          .subscribe(data => {
            console.log("#data", data);
            this.todo = data;
          })
      })
  }

}
