import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { API_URL } from '../../app.constant';
import { DecodeJWTService } from './decode-jwt.service';
import { Users } from '../../shared/users.module';

export const TOKEN = 'token';
export const AUTHENTICATED_USER = 'authenticaterUser';
export const USER_ID = 'user_id';

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

  logout() {
    // sessionStorage.removeItem(AUTHENTICATED_USER)
    // sessionStorage.removeItem(TOKEN)
    sessionStorage.clear();
  }

  signup(user: Users) {
    return this.http.post(`${API_URL}/api/auth/signup`, user, { responseType: 'text' });
  }
}
