import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SubadminsService } from '../services/subadmins.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subadmins',
  templateUrl: './subadmins.component.html',
  styleUrls: ['./subadmins.component.css']
})
export class SubadminsComponent implements OnInit {
  subadmins: any;
  id : any;
  name_error = true;
  contact_error = true;
  city_error = true;
  contact_error_text;
  searchForm = new FormGroup({
    searchbox : new FormControl('')
  })
  p:any;
  filter:any;
  subadmins_form = new FormGroup({
    name: new FormControl(''),
    contact: new FormControl(''),
    city: new FormControl(''),
    password: new FormControl('')
  });
  constructor(private subadminsService:SubadminsService,private loader:NgxUiLoaderService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getSubadmins();
  }
  addSubadmin()
  {
    if(this.subadmins_form.get('name').value == "")
    {
      this.name_error = false;
      return;
    }
    if(this.subadmins_form.get('contact').value == "")
    {
      this.contact_error_text = "** This field is required **";
      this.contact_error = false;
      return;
    }
    if(this.subadmins_form.get('contact').value.length != 10)
    {
      this.contact_error_text = "** Invalid Contact No **";
      this.contact_error = false;
      return;
    }
    if(this.subadmins_form.get('city').value == "")
    {
      this.city_error = false;
      return;
    }
    this.loader.start();
    let name = this.subadmins_form.get('name').value;
    let contact = this.subadmins_form.get('contact').value;
    let city = this.subadmins_form.get('city').value;
    let password = this.subadmins_form.get('password').value;
    console.log(name+contact+password);
    this.subadminsService.addSubadmin(name,contact,password,city).subscribe(
      data => {
        this.loader.stop();
        console.log(data);
        if(data['state'] == 'success')
        {
          this.toastr.success('Added successfully !');
          this.getSubadmins();
          this.subadmins_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  nameFocus()
  {
    this.name_error = true;
  }
  contactFocus()
  {
    this.contact_error = true;
  }
  cityFocus()
  {
    this.city_error = true;
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  onRowClicked(id)
  {
    for(var i of this.subadmins)
    {
      if(i['_id'] == id)
      {
        this.id = id;
        this.subadmins_form.patchValue({
          name: i['name'],
          contact: i['contact'],
          city: i['city']
        });
      }
    }
  }
  updateSubadmin()
  {
    this.loader.start();
    let name = this.subadmins_form.get('name').value;
    let contact = this.subadmins_form.get('contact').value;
    let city = this.subadmins_form.get('city').value;

    this.subadminsService.updateSubadmin(this.id,name,contact,city).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success("Updated successfully !");
          this.getSubadmins();
          this.subadmins_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  deleteSubadmin(id)
  {
    this.loader.start();
    this.subadminsService.deleteSubadmin(id).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success("Deleted successfully !");
          this.getSubadmins();
          this.subadmins_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  getSubadmins()
  {
    this.subadminsService.getSubadmins().subscribe(
      data => {
        console.log(data);
        if(data['state'] == 'success')
        {
          this.subadmins = data['data'];
        }
      }
    )
  }
}
