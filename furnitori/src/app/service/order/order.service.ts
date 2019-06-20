import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from 'src/app/app.constant';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient, private router: Router) { }

  getCategories() {
    return this.http.get<any[]>(API_URL + `/api/categories`);
  }

  getProductsByCategory(categoryId) {
    return this.http.get<any[]>(API_URL + `/api/categories/${categoryId}/products`);
  }

  submitOrder(order) {
    this.router.navigate(['orders']);
    return this.http.post(API_URL + '/api/order', order);

  }

  getOrdersByClient(clientId) {
    return this.http.get<any[]>(API_URL + `/api/client/${clientId}/orders`);
  }

  getOrdersBySupervisor(agentId) {
    return this.http.get<any[]>(API_URL + `/api/supervisor/${agentId}/orders`);
  }

  deliverOrder(order) {
    return this.http.put(API_URL + '/api/order/deliver' , order);
  }

}
