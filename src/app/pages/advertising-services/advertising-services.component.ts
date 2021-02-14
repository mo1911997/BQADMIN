import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AdvertisingServicesService } from '../services/advertising-services.service';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-advertising-services',
  templateUrl: './advertising-services.component.html',
  styleUrls: ['./advertising-services.component.css']
})
export class AdvertisingServicesComponent implements OnInit {
  services:any;
  file : any;
  filename : any;
  contact_error_text;
  term:any;
  name_error  = true;
  img_names_arr = [];
  img_names_arr_hidden = true;
  contact_error  = true;
  description_error = true;
  contact_person_name_error = true;
  file_error = true;
  address_error = true;
  store_type_error = true;
  img_arr = [];
  p:any;
  searchForm = new FormGroup({
    searchbox : new FormControl('')
  })
  filter:any;
  id:any;
  advertising_service_form = new FormGroup({
    name:new FormControl(''),
    description:new FormControl(''),
    contact:new FormControl(''),
    contact_person_name: new FormControl(''),
    address:new FormControl(''),
    service_type:new FormControl('')
  })
  constructor(private advertisementService:AdvertisingServicesService,private toastr:ToastrService,private loader:NgxUiLoaderService) { }

  ngOnInit(): void {
    this.img_arr[0] = "../../../assets/bqlogo.png";
    this.getServices();
  }
  getServices()
  {
    this.advertisementService.getServices().subscribe(
      data=> {
        console.log(data);
        this.services = data['data'];
      }
    )
  }
  addService()
  {

    if(this.img_arr[0] === "../../../assets/bqlogo.png")
    {
      this.file_error = false;
      return;
    }
    if(this.advertising_service_form.get('name').value == "")
    {
      this.name_error = false;
      return;
    }
    if(this.advertising_service_form.get('contact').value == "")
    {
      this.contact_error_text = "**This field is required !**";
      this.contact_error = false;
      return;
    }
    if(this.advertising_service_form.get('contact').value.length != 10)
    {
      this.contact_error_text = "**Invalid Contact No**";
      this.contact_error = false;
      return;
    }
    if(this.advertising_service_form.get('contact_person_name').value == "")
    {
      this.contact_person_name_error = false;
      return;
    }
    if(this.advertising_service_form.get('address').value == "")
    {
      this.address_error = false;
      return;
    }

    if(this.advertising_service_form.get('service_type').value == "")
    {
      this.store_type_error = false;
      return;
    }
    if(this.advertising_service_form.get('description').value == "")
    {
      this.description_error = false;
      return;
    }
    this.loader.start();
    let name = this.advertising_service_form.get('name').value;
    let contact = this.advertising_service_form.get('contact').value;
    let contact_person_name = this.advertising_service_form.get('contact_person_name').value;
    let address = this.advertising_service_form.get('address').value;
    let description = this.advertising_service_form.get('description').value;
    let service_type = this.advertising_service_form.get('service_type').value;
    this.advertisementService.addService(name,contact,contact_person_name,address,service_type,this.file,description).subscribe(
      data=> {
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.img_arr = [];
          this.toastr.success("Added successfully !");
          this.img_arr[0] = "../../../assets/bqlogo.png";
          this.getServices();
          this.advertising_service_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  numberOnly(event)
  {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }
  nameFocus()
  {
    this.name_error = true;
  }
  contactFocus()
  {
    this.contact_error = true;
  }
  contactPersonNameFocus()
  {
    this.contact_person_name_error = true;
  }
  addressFocus()
  {
    this.address_error = true;
  }
  serviceTypeFocus()
  {
    this.store_type_error = true;
  }
  updateService()
  {

  }
  deleteService(id)
  {
    this.loader.start();
    this.advertisementService.deleteService(id).subscribe(
      data => {
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Deleted successfully!');
          this.getServices();
          this.advertising_service_form.reset();
        }
        else
        {
          this.toastr.success(data['msg']);
        }
      }
    )
  }
  fileSelected(event)
  {
    this.img_arr = [];
    this.file = event.target.files;
    for(var i of this.file)
    {
        var reader = new FileReader();
        reader.onload = (event:any) => {
        this.img_arr.push(event.target.result);
      }
      reader.readAsDataURL(i);
    }
    this.file_error = true;
  }
  onRowClicked(id)
  {
    this.id = id;
    var imgs = [];
    this.img_arr = [];
    for(var i of this.services)
    {
      if(i['_id'] == id)
      {
        for(var j of i['images'])
        {
          imgs.push("https://basketqueen.in/uploads/services/"+j);
        }
        this.img_names_arr = i['images'];
          console.log(this.img_names_arr);
          this.img_names_arr_hidden = false;
        this.advertising_service_form.patchValue({
          name: i['name'],
          contact: i['contact'],
          contact_person_name: i['contact_person_name'],
          address: i['address'],
          description: i['description'],
          service_type: i['service_type'],
        });
        this.img_arr = imgs;
      }
    }
  }
}
