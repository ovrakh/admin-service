
import { HttpInterceptor, HttpRequest, HttpHandler, HttpUserEvent, HttpEvent } from "@angular/common/http";
import { Observable } from "rxjs/Observable";
import { AuthService } from "../services/auth.service";
import 'rxjs/add/operator/do';
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()
export class HomeInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.headers.get('No-Auth') == "True")
      return next.handle(req.clone());

    if (localStorage.getItem('token') != null) {
      const clonedreq = req.clone({
        headers: req.headers.set("Authorization", "Bearer " + localStorage.getItem('token'))
      });
      return next.handle(clonedreq)
        .do(
          succ => { },
          err => {
            if (err.status === 401)
              this.router.navigateByUrl('/authorization');
          }
        );
    }
    else {
      this.router.navigateByUrl('/authorization');
    }
  }
}
