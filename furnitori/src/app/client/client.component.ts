import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../service/customer/customer.service';
import { USER_ID } from '../app.constant';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
  private clients: any = [];
  private agents: any = [];
  private selectedAgent;

  constructor(private customerService: CustomerService) { }

  ngOnInit() {
    this.customerService.getInactiveClients().subscribe(
      data => this.clients = data
    );

    this.customerService.getSupplierByAdministrator(sessionStorage.getItem(USER_ID)).subscribe(
      data => this.agents = data
    );

  }
  onAccept(event) {
    console.log(event);
  }

  onDeny(event) {

  }

  selected(event) {
    console.log(event);
  }
}
