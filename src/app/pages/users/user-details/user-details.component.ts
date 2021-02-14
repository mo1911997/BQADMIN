import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  user : any;
  constructor() { }

  ngOnInit(): void {
    this.user = history.state.user;
    console.log(history.state.user);
    for(var i of this.user.orders)
        {
          // console.log(i.store._id);
          console.log(i['order_status']);
          i['_v'] = JSON.parse(i['order_status'])['Rejected'] === 1 ? "Rejected" :
                    JSON.parse(i['order_status'])['Cancelled'] === 1 ? "Cancelled" :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? "Pending" :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? "Accepted" :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 1 && JSON.parse(i['order_status'])['Delivered'] === 0 ? "Out for Delivery" : "Delivered"
        }
  }

}
