import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { NgForm } from "@angular/forms/forms";
import { ToastrService } from 'ngx-toastr';
import { User } from '../services/user.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  user: User;
  private toastr: ToastrService;

  constructor(
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.resetForm();
  }

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      email: '',
      password: ''
    }
  }

  add(form: NgForm): void {
    this.authService.registerUser({ email: form.value.email, password: form.value.password })
      .subscribe((data: any) => {
        if (data.Succeeded == true) {
          alert('User registration successful');
        }
        else
          alert('ERROR')
      });
  }
}
