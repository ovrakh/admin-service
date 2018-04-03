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

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
    ) { }

  ngOnInit() {
   // this.resetForm();
    this.initForm();
  }

  /*resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.user = {
      email: '',
      password: ''
    }
  }*/

  onSubmit() {
    const controls = this.RegisterForm.controls;

    if (this.RegisterForm.invalid) {
      console.log('INVALID', this.RegisterForm.invalid)
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    this.authService.registerUser(this.RegisterForm.value.email, this.RegisterForm.value.password)
      .subscribe(
        data => {
          console.log('registerInfo', data);
          ///alert('User registration successful');
          //this.router.navigate(['/authorization']);
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.RegisterForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  isConfirmPassword(password, confirmPassword): boolean {
    console.log('confpass', password === confirmPassword)
    return !(password === confirmPassword);
  }


  private initForm() {
    this.RegisterForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8),
      ]
      ],
      verifyPassword: ['', Validators.required],
      email: ['', [
        Validators.required, Validators.email
      ]
      ]
    },
      {
        validator: PasswordValidation.matchPassword('password', 'verifyPassword') // validation for password verification
      });
  }
}
