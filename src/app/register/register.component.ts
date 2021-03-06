import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {PasswordValidation} from '../util/passwordvalidation'

import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  RegisterForm: FormGroup;
  private msg: string;
  private isError = true;

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
    this.initForm();
  }

  onSubmit() {
    const controls = this.RegisterForm.controls;

    if (this.RegisterForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());
      return;
    }

    this.authService.registerUser(this.RegisterForm.value.email, this.RegisterForm.value.password)
      .subscribe(
        res => {
            this.authService.userAuthentication(res['data']['email'], res['data']['password'])
              .subscribe(res => {
                localStorage.setItem('token', res['data']['token']);
                this.router.navigate(['/home']);
              })
        },
        err => {
          this.newError(err.error.message);
        })
  }

  async newError(msg : string) {
    this.msg = msg;
    this.isError = false;
    await setTimeout(() => {
      this.isError = true;
    }, 3000);
  }


  isControlInvalid(controlName: string): boolean {
    const control = this.RegisterForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }


  private initForm() {
    this.RegisterForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8),] ],
      verifyPassword: ['', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.email])/*, this.isEmailUnique.bind(this)*/ ],
      },
      {
        validator: PasswordValidation.matchPassword('password', 'verifyPassword')
      });
  }
}
