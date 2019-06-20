import { Component, OnInit } from '@angular/core';
import { OrderService } from '../service/order/order.service';
import { FormControl } from '@angular/forms';
import { UiService } from '../service/ui-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  private categories = [];
  private products = [];
  private selectedCategory = new FormControl();
  private selectedProduct = new FormControl();
  private invoiceTable: any = [];
  private quantity = new FormControl();

  constructor(private orderService: OrderService, private uiService: UiService, private router: Router) { }

  ngOnInit() {
    this.orderService.getCategories().subscribe(data => this.categories = data);
  }

  onCategoryChange(event) {
    this.orderService.getProductsByCategory(event.value.id).subscribe(data => this.products = data);
  }

  // onProductChange(event) {
  // }

  onAdd() {
    if (this.selectedCategory.value === null) {
      this.uiService.showSnackBar('Please select the category', null, 4000);
    } else if (this.selectedProduct.value === null) {
      this.uiService.showSnackBar('Please select the product', null, 4000);
    } else if (this.quantity.value === null) {
      this.uiService.showSnackBar('Please enter the quantity', null, 4000);
    } else if (this.quantity.value <= 0) {
      this.uiService.showSnackBar('Quantity mund be a positive number', null, 4000);
    } else {
      // tslint:disable-next-line: max-line-length
      this.invoiceTable.push({ product: this.selectedProduct.value, quantity: this.quantity.value, total: this.selectedProduct.value.unitPrice * this.quantity.value });
      this.selectedCategory.reset();
      this.selectedProduct.reset();
      this.quantity.reset();
    }
  }

  onOrderSubmit() {
    if (this.invoiceTable.length <= 0) {
      this.uiService.showSnackBar('You have not entered any product', null, 3500);
    } else {
      this.orderService.submitOrder(this.invoiceTable).subscribe();
      this.router.navigate(['orders']);
      this.uiService.showSnackBar('Your order was submitted successfully', null, 3500);
    }
  }

}
