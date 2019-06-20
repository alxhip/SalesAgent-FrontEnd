import { Injectable } from '@angular/core';
import { AuthenticateUserService } from './auth/authenticate-user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {


  constructor(private authenticateUserService: AuthenticateUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const allowedRoles = route.data.allowedRoles;
    const isAuthorized = this.authenticateUserService.isAuthorized(allowedRoles);
    if (this.authenticateUserService.isUserLoggedIn()) {
      return true;
    }
    this.router.navigate(['login']);
    return false;
  }
}
