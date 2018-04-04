
import {HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent, HttpResponse} from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "./services/auth.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import {tap} from "rxjs/operators";

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url.indexOf('sign-in') !== -1 || req.url.indexOf('sign-up') !== -1 || req.url.indexOf('email') !== -1) {
      
      console.log('YESAUTH', req.url)
      return next.handle(req)
        .do(
          succ => { console.log('Authorized', succ)},
          err => {
            console.log(err)
            //this.router.navigateByUrl('/authorization');
          }
        );
    }

    if (localStorage.getItem('token') != null) {
      console.log('NOAUTH')
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", localStorage.getItem('token'))
      });
      return next.handle(clonedreq)
        .do(
          res => { console.log('Ok', res)},
          err => {
            console.log('Авторизация пошла по пизде')
            localStorage.clear();
            this.router.navigateByUrl('/authorization');
          })
    }
    else {
      this.router.navigate(['/authorization']);
    }
  }
}
