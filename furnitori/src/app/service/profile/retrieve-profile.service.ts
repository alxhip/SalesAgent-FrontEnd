import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { Users } from 'src/app/shared/users.module';

@Injectable({
  providedIn: 'root'
})
export class RetrieveProfileService {

  constructor(private http: HttpClient) { }

  getProfile(id) {
    return this.http.get<any>(API_URL + `/api/users/${id}`);
  }

  saveProfile(user: Users) {
    return this.http.post<Users>(API_URL + `/api/users`, user);
  }

  updateProfile(user: Users) {
    return this.http.put(API_URL + `/api/users`, user, { responseType: 'text' });
  }

  updatePassword(passForm) {
    return this.http.put(API_URL + `/api/users/password`, passForm, { responseType: 'text' });
  }

  checkPassword(user: Users) {
    return this.http.post<any>(API_URL + `/api/users/checkPassword`, user);
  }

}
