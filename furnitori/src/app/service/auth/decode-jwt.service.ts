import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodeJWTService {

  constructor() { }

  getDecodedAccessToken(token: string): any {
    try {
      // console.log(JWT(token));

      return JWT(token);
    } catch (Error) {
      return null;
    }
  }

  getUserIdJWT(token: any) {
    const decodedToken = this.getDecodedAccessToken(token);
    // console.log(decodedToken.scopes[0]);

    return decodedToken.jti;
  }

  getUserRoleJWT(token: any) {
    const decodedToken = this.getDecodedAccessToken(token);
    return decodedToken.scopes[0];
  }


}
