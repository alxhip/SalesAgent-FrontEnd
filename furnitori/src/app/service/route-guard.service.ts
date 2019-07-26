import { Injectable } from '@angular/core';
import { AuthenticateUserService } from './auth/authenticate-user.service';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';
import { USER_ID, USER_ROLE } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class RouteGuardService implements CanActivate {


  constructor(private authenticateUserService: AuthenticateUserService, private router: Router) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const currentUser = sessionStorage.getItem(USER_ID);
    if (currentUser) {
      // check if route is restricted by role
      if (route.data.allowedRoles && route.data.allowedRoles.indexOf(sessionStorage.getItem(USER_ROLE)) === -1) {
        // role not authorised so redirect to home page
        this.router.navigate(['/']);
        return false;
      }

      // authorised so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }


}
