import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL, AUTHENTICATED_USER, TOKEN, USER_ID, USER_ROLE } from '../../app.constant';
import { DecodeJWTService } from './decode-jwt.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateUserService {

  constructor(private http: HttpClient, private decodeJWT: DecodeJWTService) { }

  executeJWTAuthenticationService(username, password) {

    return this.http.post<any>(
      `${API_URL}/api/auth/signin`, {
        username,
        password
      }).pipe(
        map(
          data => {
            const token = `Bearer ${data.accessToken}`;
            sessionStorage.setItem(AUTHENTICATED_USER, username);
            sessionStorage.setItem(TOKEN, token);
            const userId = this.decodeJWT.getUserIdJWT(token);
            sessionStorage.setItem(USER_ID, userId);
            const userRole = this.decodeJWT.getUserRoleJWT(token);
            sessionStorage.setItem(USER_ROLE, userRole);
            return data;
          }
        )
      );

  }

  getAuthenticatedUser() {
    return sessionStorage.getItem(AUTHENTICATED_USER);
  }

  getAuthenticatedToken() {
    if (this.getAuthenticatedUser()) {
      return sessionStorage.getItem(TOKEN);
    }
  }

  isUserLoggedIn() {
    const user = sessionStorage.getItem(AUTHENTICATED_USER);
    return !(user === null);
  }

  // public isAuthenticated(): boolean {
  //   const token = sessionStorage.getItem('token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  logout() {
    // sessionStorage.removeItem(AUTHENTICATED_USER)
    // sessionStorage.removeItem(TOKEN)
    sessionStorage.clear();
  }

  signup(user) {
    return this.http.post(`${API_URL}/api/auth/signup`, user, { responseType: 'text' });
  }
}
