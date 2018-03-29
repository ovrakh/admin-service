import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  ReactiveForm: FormGroup;

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

  onSubmit(): void {
    console.log('submit');
    const controls = this.ReactiveForm.controls;

    if (this.ReactiveForm.invalid) {
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    this.authService.registerUser({ email: this.ReactiveForm.value.email, password: this.ReactiveForm.value.password })
      .subscribe(
        data => {
          console.log(data);
          alert('User registration successful');
          this.router.navigate(['/home']);
      }, error => {
          console.log(error);
          alert('User registration error');
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.ReactiveForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  isConfirmPassword(password, confirmPassword): boolean {
    return !(password === confirmPassword);
  }


  private initForm() {
    this.ReactiveForm = this.fb.group({
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]
      ],
      email: ['', [
        Validators.required, Validators.email
      ]
      ]
    });
  }
}
