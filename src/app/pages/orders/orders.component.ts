import { Component, OnInit } from '@angular/core';
import { OrdersService } from '../services/orders.service';
import { SocketService } from '../services/socket.service';
import { environment } from '../../../environments/environment';
import { Socket } from 'ngx-socket-io';
import { Router } from '@angular/router';
import { DeliveryAgentsService } from '../services/delivery-agents.service';
import { saveAs } from 'file-saver';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { tick } from '@angular/core/testing';
import { FormGroup, FormControl } from '@angular/forms';


// const socket = require('socket.io-client')(environment.SOCKET_ENDPOINT,{transports: ['websocket'],upgrade: true});
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {
  p:any;
  activeTabName = 'signup-area';
  filter:any;
  isModalActive = false;
  o : any;
  delboySelectDisabled = true;
  orders :any;
  getDateForm = new FormGroup({
    startDate: new FormControl(''),
    endDate: new FormControl('')
  })
  acceptList = [];
  rejectList = [];
  deliveryList = [];
  updateStatusDropdownHidden = [];
  delboyDisabledList = [];
  term:any;
  deliveryAgents;
  bb ='https://basketqueen.in/uploads/stores/';
  constructor(private loader:NgxUiLoaderService,private toastr:ToastrService,private deliveryAgentsService:DeliveryAgentsService,private router:Router,private ordersService:OrdersService,private socketService:SocketService,private socket: Socket) { }

  ngOnInit(): void {
    this.getDeliveryBoys();
    this.socket.emit('message', 'welcome');
    this.socket.on('news',(data) => {
      // console.log(data);
      this.playAudio();
      this.orders = [];
      this.acceptList = [];
      this.rejectList = [];
      this.deliveryList = [];
      this.updateStatusDropdownHidden = [];
      this.orders = JSON.parse(data);
      for(var i of this.orders)
        {
          this.delboyDisabledList.push(true);
          if(JSON.parse(i['order_status'])['Delivered'] === 1 || JSON.parse(i['order_status'])['Cancelled'] === 1 || JSON.parse(i['order_status'])['Rejected'] === 1)
          {
            this.updateStatusDropdownHidden.push(true);
          }
          else
          {
            this.updateStatusDropdownHidden.push(false);
          }
          if((JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0) && i['delivery_boy'] === undefined )
          {
            this.deliveryList.push(true);
          }
          else
          {
            this.deliveryList.push(false);
          }
          if((JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0))
          {
            this.rejectList.push(true);
          }
          else
          {
            this.rejectList.push(false);
          }
          if( i['store']['name'] === 'Aaishani' && (JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0))
          {
            this.acceptList.push(true);
          }
          else
          {
            this.acceptList.push(false);
          }
          // console.log(i.store._id);
          i['_v'] = JSON.parse(i['order_status'])['Rejected'] === 1 ? 'Rejected' :
                    JSON.parse(i['order_status'])['Cancelled'] === 1 ? 'Cancelled' :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Pending' :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Accepted' :
                    JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 1 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Out for Delivery' : 'Delivered'
        }
    });
  }



  toggleModal()
  {
    this.isModalActive = !this.isModalActive;
  }


  onStatusChanged(event,storeid,orderid)
  {
    if(event.target.value === 'Accept')
    {
      this.loader.start();
      this.delboySelectDisabled = true;
      console.log('inhere');
      this.ordersService.changeOrderStatus('Accepted',storeid,orderid,'').subscribe(
        data => {
          console.log(data);
          this.loader.stop();
          if(data['state'] == 'success')
          {
            this.socket.emit('message', 'welcome');
            this.toastr.success("Status updated successfullly!");
          }
          else
          {
            this.toastr.error("Please try again later!");
          }
        }
      )
    }
    else if(event.target.value == "Reject")
    {
      this.loader.start();
      this.delboySelectDisabled = true;
      this.ordersService.changeOrderStatus("Rejected",storeid,orderid,"").subscribe(
        data => {
          console.log(data);
          this.loader.stop();
          if(data['state'] == 'success')
          {
            this.socket.emit('message', 'welcome');
            this.toastr.success("Status updated successfullly!");
          }
          else
          {
            this.toastr.error("Please try again later!");
          }
        }
      )
    }
    else
    {
      // this.loader.start();
      this.delboySelectDisabled = false;
    }
  }
  onDelboySelected(event,storeid,orderid,i)
  {
    this.updateStatusDropdownHidden[i] = true;
    this.ordersService.changeOrderStatus("",storeid,orderid,event.target.value).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.socket.emit('message', 'welcome');
          this.toastr.success("Status updated successfullly!");
        }
        else
        {
          this.toastr.error("Please try again later!");
        }
      }
    )
  }

  generateReport()
  {
    this.ordersService.generateReport(this.getDateForm.get('startDate').value,this.getDateForm.get('endDate').value).subscribe(
      data => {
        console.log(data);
        saveAs(data, "demo.xlsx");
      }
    )
  }

  getDeliveryBoys()
  {
    this.deliveryAgentsService.getDeliveryAgents().subscribe(
      data => {
        console.log(data);
        if(data['state'] == 'success')
        {
          this.deliveryAgents = data['data'];
        }
        else
        {

        }
      }
    )
  }
  openDialog(orders2)
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

    this.isModalActive = !this.isModalActive;
  }
  gotoPastOrders()
  {
    this.router.navigate(['sidenav/orders/past-orders']);
  }
  gotoStoreOrders()
  {
    this.router.navigate(['sidenav/orders/store-orders']);
  }
  removeModal()
  {
    this.isModalActive = false;
  }
  playAudio(){
    let audio = new Audio();
    audio.src = 'assets/demo.mp3';
    audio.load();
    audio.play();
  }
  // tslint:disable-next-line: typedef
  openTab(evt,tabName)
  {
    console.log('inhere');
    var i, x, tablinks;
    x = document.getElementsByClassName('content-tab');
    for (i = 0; i < x.length; i++) {
        x[i].style.display = 'none';
    }
    tablinks = document.getElementsByClassName('tab');
    for (i = 0; i < x.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(' is-active', '');
    }
    document.getElementById(tabName).style.display = 'block';
    evt.currentTarget.className += ' is-active';
  }
  // getOrders()
  // {

  //   this.ordersService.getOrders().subscribe(
  //     data => {
  //       this.orders = data['data'];
  //       console.log(this.orders);
  //       this.playAudio();
  //       for(var i of this.orders)
  //       {
  //         console.log(i['order_status']);
  //         i['_v'] = JSON.parse(i['order_status'])['Rejected'] === 1 ? 'Rejected' :
  //                   JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 0 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Pending' :
  //                   JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 0 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Accepted' :
  //                   JSON.parse(i['order_status'])['Placed'] === 1 && JSON.parse(i['order_status'])['Accepted'] === 1 && JSON.parse(i['order_status'])['PickedUp'] === 1 && JSON.parse(i['order_status'])['Delivered'] === 0 ? 'Out for Delivery' : 'Delivered'
  //       }
  //     }
  //   )
  //}

}
