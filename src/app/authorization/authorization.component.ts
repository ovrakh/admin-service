import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from "@angular/forms";

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {

  AuthorizeForm: FormGroup;
  errorSign: string = 'ssss';

  constructor(
    private router: Router,
    private authService: AuthService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initForm();
    this.errorSign = ''
  }

  onSubmit() {
    const controls = this.AuthorizeForm.controls;

    if (this.AuthorizeForm.invalid) {
      console.log('INVALID', this.AuthorizeForm.invalid)
      Object.keys(controls)
        .forEach(controlName => controls[controlName].markAsTouched());

      return;
    }

    this.authService.userAuthentication(this.AuthorizeForm.value.email, this.AuthorizeForm.value.password)
      .subscribe((res)=>{
        console.log('TOKEN', res['data']['token']);
        localStorage.setItem('token', res['data']['token']);
        console.log('successToken', res['success'])
        if (res['success']) {
          this.router.navigate(['/home']);
        } else {
          this.errorSign = '404'; 
        }
      },
      (err)=>{
        console.log(err);
      });
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.AuthorizeForm.controls[controlName];

    const result = control.invalid && control.touched;

    return result;
  }

  private initForm() {
    this.AuthorizeForm = this.fb.group({
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
