import { Component, OnInit } from '@angular/core';
import { DeliveryAgentsService } from '../services/delivery-agents.service';
import { FormControl, FormGroup } from '@angular/forms';
import { StoresService } from '../services/stores.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-delivery-agents',
  templateUrl: './delivery-agents.component.html',
  styleUrls: ['./delivery-agents.component.css']
})
export class DeliveryAgentsComponent implements OnInit {
  deliveryAgents: any;
  p:any;
  store_error = true;
  name_error =true;
  term;
  contact_error = true;
  address_error = true;
  contact_error_text;

  searchForm = new FormGroup({
    searchbox:new FormControl('')
  })
  filter:any;
  id: any;
  delivery_agents_form = new FormGroup({
    name: new FormControl(''),
    contact: new FormControl(''),
    address: new FormControl(''),
    password: new FormControl(''),
    store:new FormControl('')
  })
  stores : any;
  constructor(private router:Router,private loader:NgxUiLoaderService,private toastr:ToastrService,private deliveryAgentsService:DeliveryAgentsService,private storesService:StoresService) { }

  ngOnInit(): void {
    this.delivery_agents_form.patchValue({
      password:'gmsdasd6as78d6as786d78as6d78s6&*^&*^@*&^@&*^&*@^D&*.dynamite'
    });
    this.getDeliveryAgents();
    this.getStores();
  }
  gotoPaymentDetails(amt,id)
  {
    this.router.navigate(['sidenav/delivery-agents/payments-history'],{state : { amount : amt,id:id }});
  }
  onRowClicked(id)
  {
    this.id = id;
    for(var i of this.deliveryAgents)
    {
      if(i['_id'] == id)
      {
        this.delivery_agents_form.patchValue({
          name: i['name'],
          contact: i['contact'],
          address: i['address'],
          store: i['store']['_id']
        });
      }
    }
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  addDeliveryAgent()
  {
    if(this.delivery_agents_form.get('store').value == "")
    {
      this.store_error = false;
      return;
    }
    if(this.delivery_agents_form.get('name').value == "")
    {
      this.name_error = false;
      return;
    }
    if(this.delivery_agents_form.get('contact').value == "")
    {
      this.contact_error_text = "**This field is required!**";
      this.contact_error = false;
      return;
    }
    // if(this.delivery_agents_form.get('contact').value,length !== 10)
    // {
    //   this.contact_error_text = "**Invalid Contact No!**";
    //   this.contact_error = false;
    //   return;
    // }
    if(this.delivery_agents_form.get('address').value == "")
    {
      this.address_error = false;
      return;
    }
    this.loader.start();
    let name = this.delivery_agents_form.get('name').value;
    let contact = this.delivery_agents_form.get('contact').value;
    let address = this.delivery_agents_form.get('address').value;
    let password = this.delivery_agents_form.get('password').value;
    let store = this.delivery_agents_form.get('store').value;
    this.deliveryAgentsService.addDeliveryAgent(name,contact,address,password,store).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success("Added successfully!");
          this.getDeliveryAgents();
          this.delivery_agents_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  updateDeliveryAgent()
  {
    this.loader.start();
    let name = this.delivery_agents_form.get('name').value;
    let contact = this.delivery_agents_form.get('contact').value;
    let address = this.delivery_agents_form.get('address').value;
    let store = this.delivery_agents_form.get('store').value;
    this.deliveryAgentsService.updateDeliveryAgent(this.id,name,contact,address,store).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Updated successfully!');
          this.getDeliveryAgents();
          this.delivery_agents_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  deleteDeliveryAgent(id)
  {
    this.loader.start();
    this.deliveryAgentsService.deleteDeliveryAgent(this.id).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Deleted successfully!');
          this.getDeliveryAgents();
          this.delivery_agents_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  storeFocus()
  {
    this.store_error = true;
  }
  nameFocus()
  {
    this.name_error = true;
  }
  contactFocus()
  {
    this.contact_error = true;
  }
  addressFocus()
  {
    this.address_error = true;
  }
  getDeliveryAgents()
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
  getStores()
  {
    this.storesService.getStores().subscribe(
      data => {
        console.log(data);
        this.stores = data['data'];
      }
    )
  }
}
