import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-error-auth',
  templateUrl: './error-auth.component.html',
  styleUrls: ['./error-auth.component.css']
})
export class ErrorAuthComponent implements OnInit {

  @Input() errorAuth: string;

  constructor() { }

  ngOnInit() {
    
  }

}
