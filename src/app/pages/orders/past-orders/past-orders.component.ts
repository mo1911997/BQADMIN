import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../../services/orders.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-past-orders',
  templateUrl: './past-orders.component.html',
  styleUrls: ['./past-orders.component.css']
})
export class PastOrdersComponent implements OnInit {
  orders : any;
  getDateForm = new FormGroup({
    date: new FormControl('')
  })
  o:any;
  final_date;
  term:any;
  p:any;
  constructor(private router:Router,private ordersService:OrdersService) { }

  ngOnInit(): void {
    // this.getOrders();
  }
  getDate()
  {
    var x =this.getDateForm.get('date').value;
    console.log(this.getDateForm.get('date').value);
    console.log(x.toString().split('-')[2].split("")[0]);
    if(x.toString().split('-')[2].split("")[0] == 0)
    {
      if(x.toString().split('-')[1].split("")[0] == 0)
      {
        this.final_date = x.toString().split('-')[2].split("")[1]+"/"+x.toString().split('-')[1].split("")[1]+"/"+x.toString().split('-')[0];
        console.log(this.final_date);
      }
      else
      {
        this.final_date = x.toString().split('-')[2].split("")[1]+"/"+x.toString().split('-')[1]+"/"+x.toString().split('-')[0];
        console.log(this.final_date);
      }
    }
    else
    {
      if(x.toString().split('-')[1].split("")[0] == 0)
      {
        this.final_date = x.toString().split('-')[2]+"/"+x.toString().split('-')[1].split("")[1]+"/"+x.toString().split('-')[0];
        console.log(this.final_date);
      }
      else
      {
        this.final_date = x.toString().split('-')[2]+"/"+x.toString().split('-')[1]+"/"+x.toString().split('-')[0];
        console.log(this.final_date);
      }

    }
   // console.log(this.final_date);
    this.getOrders();
  }
  getOrders()
  {
    this.ordersService.getOrders(this.final_date).subscribe(
      data => {
        this.orders = data['data'];
        console.log(this.orders);
        for(var i of this.orders)
        {
          // console.log(i.store._id);
          console.log(i['order_status']);
          i['_v'] = JSON.parse(i['order_status'])['Rejected'] === 1 ? 'Rejected' :
                    JSON.parse(i['order_status'])['Cancelled'] === 1 ? 'Cancelled' :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Pending' :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Accepted' :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 1 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Out for Delivery' : 'Delivered'
        }
      }
    )
  }
  gotoDetails(orders2)
  {
    this.router.navigate(['sidenav/orders/order-details'],{state:{order:orders2}});
    this.o = orders2;
    console.log(this.o);
    var i = this.o;
    this.o['_v'] = JSON.parse(i['order_status'])['Rejected'] === 1 ? 'Rejected' :
    JSON.parse(i['order_status'])['Cancelled'] === 1 ? 'Cancelled' :
    JSON.parse(this.o['order_status'])['Placed'] === 1 && JSON.parse(this.o['order_status'])['Accepted'] === 0 && JSON.parse(this.o['order_status'])['PickedUp'] === 0 && JSON.parse(this.o['order_status'])['Delivered'] === 0 ? 'Pending' :
    JSON.parse(this.o['order_status'])['Placed'] === 1 && JSON.parse(this.o['order_status'])['Accepted'] === 1 && JSON.parse(this.o['order_status'])['PickedUp'] === 0 && JSON.parse(this.o['order_status'])['Delivered'] === 0 ? 'Accepted' :
    JSON.parse(this.o['order_status'])['Placed'] === 1 && JSON.parse(this.o['order_status'])['Accepted'] === 1 && JSON.parse(this.o['order_status'])['PickedUp'] === 1 && JSON.parse(this.o['order_status'])['Delivered'] === 0 ? 'Out for Delivery' : 'Delivered'
  }
}
