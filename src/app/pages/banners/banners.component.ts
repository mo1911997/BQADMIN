import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { BannersService } from '../services/banners.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { ProductsService } from '../services/products.service';
import { StoresService } from '../services/stores.service';

@Component({
  selector: 'app-banners',
  templateUrl: './banners.component.html',
  styleUrls: ['./banners.component.css']
})
export class BannersComponent implements OnInit {
  p:any;
  banners:any;
  filter:any;
  id:any;
  products = [];
  product_error = true;
  store_error= true;
  category_error= true;
  products2 = [];
  categories = [];
  stores =  [];
  bannerForm = new FormGroup({
    store:new FormControl(''),
    category:new FormControl(''),
    product: new FormControl('')
  });
  constructor(private productsService:ProductsService,private storesService:StoresService,private bannersService:BannersService,private loader:NgxUiLoaderService,private toastr:ToastrService) { }

  ngOnInit(): void {
    this.getStores();
    this.getBanners();
  }
  addBanner()
  {
    if(this.bannerForm.get('store').value == "")
    {
      this.store_error = false;
      return;
    }
    if(this.bannerForm.get('category').value == "")
    {
      this.category_error = false;
      return;
    }
    if(this.bannerForm.get('product').value == "")
    {
      this.product_error = false;
      return;
    }
    this.loader.start();
    console.log(this.bannerForm.value);
    this.bannersService.addBanner(this.bannerForm.get('store').value,this.bannerForm.get('category').value,this.bannerForm.get('product').value).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success("Added successfully!");
          this.getBanners();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }

  getStores()
  {
    this.storesService.getStores().subscribe(
      data => {
        this.stores = data['data'];
      }
    )
  }
  onStoreSelected(event)
  {
    for(var i of this.stores)
    {
      if(i['_id'] == event.target.value)
      {
        this.categories = i['categories'];
      }
    }
  }
  onProductSelected(event)
  {

  }
  onCategorySelected(event)
  {
    for(var i of this.categories)
    {
      if(i['_id'] == event.target.value)
      {
        this.products = i['products'];
      }
    }
  }
  onRowClicked(id)
  {
    this.id = id;
    for(var i of this.banners)
    {
      if(this.id == i['_id'])
      {
        this.bannerForm.patchValue({
          store:i['store']['_id'],
          category:i['category']['_id'],
          product :i['product']['_id']
        })
      }
    }
  }
  deleteBanner(id)
  {
    this.loader.start();
    this.bannersService.deleteBanner(id).subscribe(
      data => {
        console.log(data);
        this.loader.stop();
        if(data['state']== 'success')
        {
          this.toastr.success("Deleted successfully!");
          this.getBanners();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  getBanners()
  {
    this.bannersService.getBanners().subscribe(
      data => {
        this.banners = data['data'];
      }
    )
  }
  store_focus()
  {
    this.store_error = true;
  }
  category_focus()
  {
    this.category_error = true;
  }
  product_focus()
  {
    this.product_error = true;
  }
}
