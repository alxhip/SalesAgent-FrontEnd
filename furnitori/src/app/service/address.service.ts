import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../app.constant';

@Injectable({
  providedIn: 'root'
})
export class AddressService {

  constructor(private http: HttpClient) { }

  getClientsData(supervisorId) {
    return this.http.get<any[]>(API_URL + `/api/clients/${supervisorId}`);
  }

}
