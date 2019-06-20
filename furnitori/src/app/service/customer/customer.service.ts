import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }

  getAllClientDataByAdministrator(administratorId) {
    return this.http.get<any[]>(API_URL + `/api/administrator/${administratorId}/clients`);
  }

  // getClientDataBySupplier(supplierId) {
  //   return this.http.get<any[]>(API_URL + `/api/clients/${supplierId}`);
  // }

  getSupplierByAdministrator(administratorId) {
    return this.http.get<any[]>(API_URL + `/api/administrator/${administratorId}/suppliers`);
  }

  getClientsBySupplier(supplierId) {
    return this.http.get<any[]>(API_URL + `/api/supplier/${supplierId}/clients`);
  }

  getClientsSortedAddresses(clientIds) {
    return this.http.get<any[]>(API_URL + `/api/client/sortedAddresses/${clientIds}`);
  }

  getClientsBySupervisor(supervisorId) {
    return this.http.get<any[]>(API_URL + `/api/client/supervisor/${supervisorId}`);
  }

  getInactiveClients() {
    return this.http.get<any[]>(API_URL + `/api/client/inactive`);
  }


}
