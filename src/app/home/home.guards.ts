import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import { AuthService } from "../services/auth.service"

@Injectable()
export class HomeGuard implements CanActivate {

  constructor(private router : Router,
              private authService : AuthService){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if (localStorage.getItem('token') != null){
      if (this.authService.asUser(localStorage.getItem('token')))
      return true;
    }
    this.router.navigate(['/authorization']);
    return false;
  }
}

