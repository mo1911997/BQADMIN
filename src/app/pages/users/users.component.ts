import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  users:any;
  isModalActive: boolean = false;
  p:any;
  filter:any;
  addresses : any;
  orders : any;
  constructor(private router:Router,private usersService:UsersService) { }

  ngOnInit(): void {
    this.getUsers();
  }
  toggleModal(u) {

    this.router.navigate(['sidenav/users/user-details'],{ state: { user : u } });
    return;
    // this.addresses = addresses;
    // this.orders = orders;
    // for(var i of this.orders)
    //     {
    //       // console.log(i.store._id);
    //       console.log(i['order_status']);
    //       i['_v'] = JSON.parse(i['order_status'])['Rejected'] === 1 ? "Rejected" :
    //                 JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? "Pending" :
    //                 JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? "Accepted" :
    //                 JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 1 && JSON.parse(i['order_status'])['Delivered'] === 0 ? "Out for Delivery" : "Delivered"
    //     }
    // this.isModalActive = !this.isModalActive;
  }
  removeModal()
  {
    this.isModalActive = false;
  }
  deleteUser(id)
  {

  }
  getUsers()
  {
    this.usersService.getUsers().subscribe(
      data => {
        console.log(data);
        this.users = data['data'];
      }
    )
  }
}
