import { Component, OnInit } from '@angular/core';
import { StoresService } from '../services/stores.service';
import { FormGroup, FormControl } from '@angular/forms';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { saveAs } from 'file-saver';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {
  id:any;
  name_error = true;
  contact_error = true;
  img_name;
  img_name_hidden = true;
  gst_error = true;
  pan_error = true;
  address_error = true;
  totalCountOfPages;
  owner_error = true;
  latitude_error = true;
  longitude_error = true;
  file_error = true;
  isGSTRegistered = false;
  contact_error_text = ""
  store_type_error = true;
  p: any;
  page;
  maxsize = 5;
  filter: any;
  file:any;
  img_src = "../../../assets/bqlogo.png";
  filename:any;
  stores = [];
  store_form = new FormGroup({
    name: new FormControl(''),
    contact: new FormControl(''),
    address: new FormControl(''),
    latitude:new FormControl(''),
    longitude:new FormControl(''),
    owner_name: new FormControl(''),
    open_time:new FormControl('09:00'),
    offline : new FormControl(true),
    gst_registered: new FormControl(''),
    gst_no: new FormControl(''),
    pan_no: new FormControl(''),
    close_time:new FormControl('22:00'),
    minimum_order:new FormControl('0'),
    delivery_type:new FormControl('aaishani'),
    store_category:new FormControl(''),
    pune: new FormControl(''),
    sangli: new FormControl(''),
    satara: new FormControl(''),
    kolhapur: new FormControl(''),
    solapur: new FormControl(''),
  })
  isModalActive = false;
  gstValue : any;
  constructor(private router:Router,private cookieService:CookieService,private storesService:StoresService,private loader:NgxUiLoaderService,private toastr:ToastrService) { }
  dropdownList = [];
  term:any;
  selectedItems = [];
  dropdownSettings = {};
  onItemSelect(item: any) {

  }
  onSelectAll(items: any) {

  }
  toggleModal(){
    this.isModalActive = !this.isModalActive;
  }

  ngOnInit(): void {
    // if(this.cookieService.get('at') == null || this.cookieService.get('at') === undefined || this.cookieService.get('at') === "")
    // {
    //   console.log('inhere');
    //   this.router.navigate(['/login']);
    //   return;
    // }
   // this.getStores();
    this.getStoresDisplay(1);
    this.store_form.patchValue({
      pune: true,
      sangli: true,
      satara: true,
      solapur: true,
      kolhapur: true,
    })
    this.dropdownList = [
      { item_id: 1, item_text: 'Mumbai' },
      { item_id: 2, item_text: 'Bangaluru' },
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' },
      { item_id: 5, item_text: 'New Delhi' }
    ];
    this.selectedItems = [
      { item_id: 3, item_text: 'Pune' },
      { item_id: 4, item_text: 'Navsari' }
    ];
    // this.dropdownSettings:IDropdownSettings = {
    //   singleSelection: false,
    //   idField: 'item_id',
    //   textField: 'item_text',
    //   selectAllText: 'Select All',
    //   unSelectAllText: 'UnSelect All',
    //   itemsShowLimit: 3,
    //   allowSearchFilter: true
    // };
  }
  fileSelected(event)
  {
    var prev_img = this.img_src;
    this.file = event.target.files[0];
    this.filename = event.target.files[0].name;
    var reader = new FileReader();

        reader.onload = (event:any) => {
            this.img_src = event.target.result;
        }

    reader.readAsDataURL(event.target.files[0]);
    this.file_error  = true;
    if(prev_img != "../../../assets/bqlogo.png")
    {
      this.loader.start();
      this.storesService.updateImages(this.id,this.file).subscribe(
        data => {
          this.loader.stop();
          if(data['state'] == 'success')
          {
            this.toastr.success('Image updated !');
            this.img_name_hidden = true;
          }
          else
          {
            this.toastr.error('Server Error');
          }
        }
      )
    }
  }
  onRowClicked(id)
  {
    for(var i of this.stores)
    {
      if(i['_id'] == id)
      {
        this.id = id;
        this.img_src = "https://basketqueen.in/uploads/stores/"+i['thumbnail']+"?dummy=34344";
        console.log(i['cities'][0]);

        this.store_form.patchValue({
          name: i['name'],
          contact: i['contact'],
          address: i['address'],
          owner_name: i['owner_name'],
          minimum_order: i['minimum_order'],
          latitude: i['latitude'],
          offline:i['offline'],
          longitude: i['longitude'],
          gst_registered: i['gst_registered'],
          delivery_type: i['delivery_type'],
          store_category: i['store_category'],
          pune:i['cities'].includes('Pune') === true ? true :false,
          satara:i['cities'].includes('Satara') === true ? true :false,
          kolhapur:i['cities'].includes('Kolhapur') === true ? true :false,
          solapur:i['cities'].includes('Solapur') === true ? true :false,
          sangli:i['cities'].includes('Sangli') === true ? true :false,
        });
        if(i['gst_registered'] === true)
        {
          this.isGSTRegistered = true;
          this.store_form.patchValue({
            gst_no:i['gst_no'],
            pan_no:i['pan_no']
          })
        }
        this.img_name = i['thumbnail'];
        this.img_name_hidden = false;
      }
    }
  }
  removeModal()
  {
    this.isModalActive = false;
  }
  gotoPaymentDetails(amount,id)
  {
    this.router.navigate(['sidenav/stores/payments-history'],{ state: { hello: amount ,id:id} });
  }
  addStore()
  {

    if(this.img_src === "../../../assets/bqlogo.png")
    {
      this.file_error = false;
      return;
    }
    if(this.store_form.get('name').value === '')
    {
      this.name_error = false;
      return;
    }
    if(this.store_form.get('contact').value === '')
    {
      this.contact_error_text = '** This field is required **';
      this.contact_error = false;
      return;
    }
    if(this.store_form.get('contact').value.length !== 10)
    {
      this.contact_error_text = '** Invalid contact **';
      this.contact_error = false;
      return;
    }
    if(this.store_form.get('address').value === '')
    {
      this.address_error = false;
      return;
    }
    console.log(this.store_form.get('owner_name').value === '');
    if(this.store_form.get('owner_name').value === '')
    {
      this.owner_error = false;
      return;
    }
    if(this.store_form.get('latitude').value === '')
    {
      this.latitude_error = false;
      return;
    }
    if(this.store_form.get('longitude').value === '')
    {
      this.longitude_error = false;
      return;
    }
    if(this.store_form.get('store_category').value === '')
    {
      this.store_type_error = false;
      return;
    }

    let gst_registered;
    if(this.store_form.get('gst_registered').value == false || this.store_form.get('gst_registered').value == "")
    {
      gst_registered = false;
    }
    else
    {
      gst_registered = true;
    }
    if(this.store_form.get('gst_registered').value === true && this.store_form.get('gst_no').value === '')
    {
      this.gst_error = false;
      return;
    }
    if(this.store_form.get('gst_registered').value === true && this.store_form.get('pan_no').value === '')
    {
      this.pan_error = false;
      return;
    }
    var c_arr = [];
    if(this.store_form.get('pune').value != "" || this.store_form.get('pune').value != false)
    {
      c_arr.push("Pune");
    }
    if(this.store_form.get('sangli').value != "" || this.store_form.get('sangli').value != false)
    {
      c_arr.push("Sangli");
    }
    if(this.store_form.get('satara').value != "" || this.store_form.get('satara').value != false)
    {
      c_arr.push("Satara");
    }
    if(this.store_form.get('kolhapur').value != "" || this.store_form.get('kolhapur').value != false)
    {
      c_arr.push("Kolhapur");
    }
    if(this.store_form.get('solapur').value != "" || this.store_form.get('solapur').value != false)
    {
      c_arr.push("Solapur");
    }
    this.loader.start();
    let name = this.store_form.get('name').value;
    let contact = this.store_form.get('contact').value;
    let address = this.store_form.get('address').value;
    let owner_name = this.store_form.get('owner_name').value;
    let gst_no = this.store_form.get('gst_no').value;
    let pan_no = this.store_form.get('pan_no').value;
    let offline = this.store_form.get('offline').value;

    let password = "gmsdasd6as78d6as786d78as6d78s6&*^&*^@*&^@&*^&*@^D&*.dynamite";
    let minimum_order = this.store_form.get('minimum_order').value;
    let open_time = this.store_form.get('open_time').value;
    let close_time = this.store_form.get('close_time').value;
    let latitude = this.store_form.get('latitude').value;
    let longitude = this.store_form.get('longitude').value;
    let delivery_type = this.store_form.get('delivery_type').value;
    let store_category = this.store_form.get('store_category').value;

    this.storesService.addStore(offline,gst_registered,name,contact,address,owner_name,password,minimum_order,open_time,close_time,delivery_type,store_category,this.file,c_arr,latitude,longitude,gst_no,pan_no).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] === 'success')
        {
          this.toastr.success('Store added successfully !');
     //     this.getStores();
          this.img_src  = "../../../assets/bqlogo.png" ;
          this.img_name_hidden = true;
          // this.store_form.reset();
          this.store_form.patchValue({
            pune:true,
            sangli:true,
            solapur:true,
            satara:true,
            kolhapur:true,
          });
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  name_focus()
  {
    this.name_error = true;
  }
  contact_focus()
  {
    this.contact_error = true;
  }
  address_focus()
  {
    this.address_error = true;
  }
  owner_focus()
  {
    this.owner_error = true;
  }
  latitude_focus()
  {
    this.latitude_error = true;
  }
  longitude_focus()
  {
    this.longitude_error = true;
  }
  store_type_focus()
  {
    this.store_type_error = true;
  }
  getStoreReport(id)
  {
    this.storesService.get_store_report(id).subscribe(
      data => {
        saveAs(data, "demo.xlsx");
      }
    )
  }
  updateStore()
  {
    let gst_registered2;
    if(this.file === undefined)
    {
      this.file = "";
    }
    if(this.img_src === "../../../assets/bqlogo.png")
    {
      this.file_error = false;
      return;
    }
    if(this.store_form.get('name').value === '')
    {
      this.name_error = false;
      return;
    }
    if(this.store_form.get('contact').value === '')
    {
      this.contact_error_text = '** This field is required **';
      this.contact_error = false;
      return;
    }
    if(this.store_form.get('contact').value.length !== 10)
    {
      this.contact_error_text = '** Invalid contact **';
      this.contact_error = false;
      return;
    }
    if(this.store_form.get('address').value === '')
    {
      this.address_error = false;
      return;
    }
    console.log(this.store_form.get('owner_name').value === '');
    if(this.store_form.get('owner_name').value === '')
    {
      this.owner_error = false;
      return;
    }
    if(this.store_form.get('latitude').value === '')
    {
      this.latitude_error = false;
      return;
    }
    if(this.store_form.get('longitude').value === '')
    {
      this.longitude_error = false;
      return;
    }
    if(this.store_form.get('store_category').value === '')
    {
      this.store_type_error = false;
      return;
    }
    if(this.store_form.get('gst_registered').value === false || this.store_form.get('gst_registered').value === "")
    {
      gst_registered2 = false;
    }
    else
    {
      gst_registered2 = true;
    }
    if(this.store_form.get('gst_registered').value === true && this.store_form.get('gst_no').value === '')
    {
      this.gst_error = false;
      return;
    }
    if(this.store_form.get('gst_registered').value === true && this.store_form.get('pan_no').value === '')
    {
      this.pan_error = false;
      return;
    }
    var c_arr = [];
    if(this.store_form.get('pune').value != "" || this.store_form.get('pune').value != false)
    {
      c_arr.push("Pune");
    }
    if(this.store_form.get('sangli').value != "" || this.store_form.get('sangli').value != false)
    {
      c_arr.push("Sangli");
    }
    if(this.store_form.get('satara').value != "" || this.store_form.get('satara').value != false)
    {
      c_arr.push("Satara");
    }
    if(this.store_form.get('kolhapur').value != "" || this.store_form.get('kolhapur').value != false)
    {
      c_arr.push("Kolhapur");
    }
    if(this.store_form.get('solapur').value != "" || this.store_form.get('solapur').value != false)
    {
      c_arr.push("Solapur");
    }
    this.loader.start();
    let name = this.store_form.get('name').value;
    let contact = this.store_form.get('contact').value;
    let address = this.store_form.get('address').value;
    let owner_name = this.store_form.get('owner_name').value;
    // let password = this.store_form.get('password').value;
    let minimum_order = this.store_form.get('minimum_order').value;
    let open_time = this.store_form.get('open_time').value;
    let gst_no = this.store_form.get('gst_no').value;
    let pan_no = this.store_form.get('pan_no').value;
    let offline = this.store_form.get('offline').value;
    console.log(offline);
   // let gst_registered = this.store_form.get('gst_registered').value;
    let latitude = this.store_form.get('latitude').value;
    let longitude = this.store_form.get('longitude').value;
    let close_time = this.store_form.get('close_time').value;
    let delivery_type = this.store_form.get('delivery_type').value;
    let store_category = this.store_form.get('store_category').value;

    this.storesService.updateStore(offline,gst_registered2,this.id,name,contact,address,owner_name,minimum_order,open_time,close_time,delivery_type,store_category,this.file  === undefined?'':this.file,c_arr,latitude,longitude,gst_no,pan_no).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] === 'success')
        {
          this.toastr.success('Store updated successfully !');
         // this.getStores();
          this.img_name_hidden = true;
          // this.store_form.reset();
          this.store_form.patchValue({
            pune:true,
            sangli:true,
            solapur:true,
            satara:true,
            kolhapur:true,
          });

        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }

  onCheckboxChecked(event)
  {
      this.gstValue = event.checked;
      if(this.store_form.get('gst_registered').value === true)
      {
        this.isGSTRegistered = true;
      }
      else
      {
        this.isGSTRegistered = false;
      }
      console.log(this.gstValue);
  }

  deleteStore(id)
  {
    this.loader.start();
    this.storesService.deleteStore(id).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Store deleted successfully !');
        //  this.getStores();
          // this.store_form.reset();
          this.store_form.patchValue({
            pune:true,
            sangli:true,
            solapur:true,
            satara:true,
            kolhapur:true,
          });
          this.file = [];
          this.filename = "";
        }
        else
        {
          this.toastr.error('Please try again later !');
        }
      }
    )
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  numberOnly2(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if(charCode === 46)
    {
      return true;
    }
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  pageChanged(event)
  {
    this.getStoresDisplay(event);
  }
  getStoresDisplay(page)
  {
    this.page = page;
    console.log(page);
    this.storesService.getStoresDisplay(this.page).subscribe(
      data => {

        if(data['state'] == 'success')
        {
          console.log(data);
          for(var i of data['data'])
          {
            this.stores.push(i);
          }
          this.totalCountOfPages = data['total_count'];
          this.p = page;
        }
        else
        {

        }
      }
    )
  }
}
