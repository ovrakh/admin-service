import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import {Injectable} from "@angular/core";

@Injectable()
export class RegisterGuard implements CanActivate {

  constructor(private router : Router){}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot):  boolean {
    if (localStorage.getItem('token') == null){
      return true;
    }
    this.router.navigate(['/home']);
  }
}
