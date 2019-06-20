import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class DecodeJWTService {

  constructor() { }

  getDecodedAccessToken(token: string): any {
    try {
      return JWT(token);
    } catch (Error) {
      return null;
    }
  }

  getUserIdJWT(token: any) {
    const decodedToken = this.getDecodedAccessToken(token);
    return decodedToken.jti;
  }


}
