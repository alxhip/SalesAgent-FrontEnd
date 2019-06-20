import { HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthenticateUserService } from './authenticate-user.service';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {
  constructor(private authenticateUser: AuthenticateUserService) { }

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    const basicAuthHeaderString = this.authenticateUser.getAuthenticatedToken();
    const username = this.authenticateUser.getAuthenticatedUser();

    if (basicAuthHeaderString && username) {
      request = request.clone({
        setHeaders: {
          Authorization: basicAuthHeaderString
        }
      });
    }
    return next.handle(request);
  }
}
