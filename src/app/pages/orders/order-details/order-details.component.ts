import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
  o;
  constructor() { }

  ngOnInit(): void {
    this.o = history.state.order;
    this.o['_v'] = JSON.parse(this.o['order_status'])['Rejected'] === 1 ? "Rejected" :
    JSON.parse(this.o['order_status'])['Cancelled'] === 1 ? 'Cancelled' :
    JSON.parse(this.o['order_status'])['Placed'] === 1 && JSON.parse(this.o['order_status'])['Accepted'] === 0 && JSON.parse(this.o['order_status'])['PickedUp'] === 0 && JSON.parse(this.o['order_status'])['Delivered'] === 0 ? "Pending" :
    JSON.parse(this.o['order_status'])['Placed'] === 1 && JSON.parse(this.o['order_status'])['Accepted'] === 1 && JSON.parse(this.o['order_status'])['PickedUp'] === 0 && JSON.parse(this.o['order_status'])['Delivered'] === 0 ? "Accepted" :
    JSON.parse(this.o['order_status'])['Placed'] === 1 && JSON.parse(this.o['order_status'])['Accepted'] === 1 && JSON.parse(this.o['order_status'])['PickedUp'] === 1 && JSON.parse(this.o['order_status'])['Delivered'] === 0 ? "Out for Delivery" : "Delivered";
  }

}
