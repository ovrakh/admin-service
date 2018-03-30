import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from "@angular/forms/forms";

import { AuthService } from '../services/auth.service';
import { User } from '../services/user.model';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onSubmit(username, password) {
    this.authService.userAuthentication(username,password)
      .subscribe((res)=>{
        console.log('TOKEN', res['data']['token']);
      //  localStorage.setItem('token', res['data']['token']);
        console.log('success', res['success'])
        if (res['success'])
          this.router.navigate(['/home']);
      },
      (err)=>{
        console.log(err);
      });
}

}
