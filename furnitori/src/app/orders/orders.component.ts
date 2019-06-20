import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { USER_ROLE, USER_ID } from '../app.constant';
import { OrderService } from '../service/order/order.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  private orders = [];
  private userRole = sessionStorage.getItem(USER_ROLE);

  constructor(private router: Router, private orderService: OrderService) {

  }



  ngOnInit() {
    this.fetchData();

  }

  onNewOrder() {
    this.router.navigate(['newOrder']);
  }

  onDelivered(order) {
    this.orderService.deliverOrder(order).subscribe(data => this.fetchData());


  }
  fetchData() {
    if (this.userRole === 'Client') {
      this.orderService.getOrdersByClient(sessionStorage.getItem(USER_ID)).subscribe(data => {
        this.orders = data;
      });
    } else {
      this.orderService.getOrdersBySupervisor(sessionStorage.getItem(USER_ID)).subscribe(data => {
        this.orders = data;
      });
    }
  }

}
