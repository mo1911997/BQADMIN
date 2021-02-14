import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { StoresService } from '../services/stores.service';
import { ProductsService } from '../services/products.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  variants:FormArray;
  id: any;
  p:any;
  file:any;
  term:any;
  store_error = true;
  img_names_arr = [];
  img_names_arr_hidden = true;
  category_error = true;
  name_error = true;
  status_error = true;
  hsn_visible = false;
  hsn_error = true;
  products_list = [];
  gst_per_error = true;
  description_error = true;
  commission_per_error = true;
  file_error = true;
  returnable;
  products:any;
  categories:any;
  isStoreGSTRegistered : any;
  img_arr = [];
  filename:any;
  filter:any;
  products_form = new FormGroup({
    name: new FormControl(''),
    category:new FormControl(''),
    hsn:new FormControl(''),
    percentage: new FormControl(''),
    returnable: new FormControl(false),
    gst_per : new FormControl(''),
    status: new FormControl('active'),
    description:new FormControl(''),
    store: new FormControl(''),
    variants: this.fb.array([this.createVariantsAdd()])
  });

  stores:any;
  constructor(private loader:NgxUiLoaderService,private toastr:ToastrService,private storesService:StoresService,private fb:FormBuilder,private productsService:ProductsService) { }
  createVariantsAdd() : FormGroup
  {
    return this.fb.group({
      name:new FormControl(''),
      mrp:new FormControl(''),
      discounted_price:new FormControl(''),
      status:new FormControl('active'),
      purchase_amount : new FormControl(''),
      threshold:new FormControl('0'),
      weight:new FormControl(''),
      description:new FormControl('')
    });
  }
  onStoreSelected(event)
  {
    for(var i of this.stores)
    {
      if(event.target.value == i['_id'])
      {
        if(i['gst_registered'] == true)
        {
          this.hsn_visible = true;
        }
        else
        {
          this.hsn_visible = false;
        }
        this.isStoreGSTRegistered = i['gst_registered'];
        this.categories = i['categories'];
      }
    }
  }
  addVariants(): void {
    this.variants = this.products_form.get('variants') as FormArray;
    this.variants.push(this.createVariantsAdd());
  }
  ngOnInit(): void {
    this.img_arr[0] = "../../../assets/bqlogo.png";
    this.getProducts();
    this.getStores();
  }
  onPurchaseAmountFocusChanged(index,event)
  {
    // var amt = (parseInt(this.products_form.get('gst_per').value)/100) * event.target.value;
    // this.variants.at(index).patchValue({
    //   gst_per: amt
    // });
    if(this.isStoreGSTRegistered === false)
    {
      const faControl =
      (<FormArray>this.products_form.controls['variants']).at(index);
      console.log(faControl);
      console.log(event.target.value);
      var x2 = parseFloat(event.target.value) + ((parseInt(this.products_form.get('percentage').value) / 100) * event.target.value);
      console.log(x2);
      var y = x2 + (x2 * (parseInt(this.products_form.get('gst_per').value) / 100));
      console.log(y);
      let totalSalePrice = y + ((parseInt(this.products_form.get('gst_per').value)/100) * y);
      faControl['controls'].discounted_price.setValue(totalSalePrice);
    }
    else
    {
      const faControl =
      (<FormArray>this.products_form.controls['variants']).at(index);
      console.log(faControl);
      console.log(event.target.value);
      var x = event.target.value;
      var cc = ((parseInt(this.products_form.get('gst_per').value)/100) * event.target.value) + parseFloat(event.target.value)
      faControl['controls'].purchase_amount.setValue(((parseInt(this.products_form.get('gst_per').value)/100) * event.target.value) + parseFloat(event.target.value));
      console.log(cc);
      var storeCommissionAddedValue = cc + ((parseInt(this.products_form.get('percentage').value)/100) * cc);
      console.log(storeCommissionAddedValue);
      let x2 = storeCommissionAddedValue + ((parseInt(this.products_form.get('gst_per').value)/100) * storeCommissionAddedValue);
      console.log(x2);

      faControl['controls'].discounted_price.setValue(x2);
      console.log(this.isStoreGSTRegistered);
    }
  }
  onCheckboxChecked(event)
  {
    this.returnable = event.checked;
  }
  getProducts()
  {
    this.productsService.getProducts().subscribe(
      data => {
        if(data['state'] == 'success')
        {
          this.products = data['data'];
          console.log(this.products);
        }
      }
    )
  }
  getStores()
  {
    this.stores = [];
    this.products_list = [];
    this.storesService.getStores().subscribe(
      data => {

        this.stores = data['data'];
        console.log(this.stores);
        for(var i of this.stores)
        {
          for(var j of i['categories'])
          {
            for(var k of j['products'])
            {
              this.products_list.push(k);
            }
          }
        }
      }
    )
  }
  addProduct()
  {
    if(this.img_arr[0] === "../../../assets/bqlogo.png")
    {
      this.file_error = false;
      return;
    }
    if(this.products_form.get('store').value === '')
    {
      this.store_error = false;
      return;
    }
    if(this.products_form.get('category').value === '')
    {
      this.category_error = false;
      return;
    }
    if(this.products_form.get('name').value === '')
    {
      this.name_error = false;
      return;
    }
    // if(this.products_form.get('hsn').value === '')
    // {
    //   this.hsn_error = false;
    //   return;
    // }
    if(this.products_form.get('status').value === '')
    {
      this.status_error = false;
      return;
    }
    if(this.products_form.get('gst_per').value === '')
    {
      this.gst_per_error = false;
      return;
    }
    if(this.products_form.get('percentage').value === '')
    {
      this.commission_per_error = false;
      return;
    }
    this.loader.start();
    let name = this.products_form.get('name').value;
    let status = this.products_form.get('status').value;
    let percentage = this.products_form.get('percentage').value;
    let returnable = this.products_form.get('returnable').value;

    let hsn = this.products_form.get('hsn').value;
    let description = this.products_form.get('description').value;
    console.log('RETURNABLE'+hsn);
    let gst_per = this.products_form.get('gst_per').value;
    let category = this.products_form.get('category').value;
    let store = this.products_form.get('store').value;
    let variants = this.products_form.get('variants').value;
    this.productsService.addProduct(description,returnable,gst_per,store,name,category,status,percentage,variants,this.file,hsn).subscribe(
      data=> {
        this.loader.stop();
        if(data['state'] == 'success')
        {
          // this.img_arr = [];
          this.toastr.success('Product added successfully!');
          this.img_arr[0] = "../../../assets/bqlogo.png";
          this.getStores();
        }
        else
        {
          this.toastr.error('Server Error');
        }
      }
    )
  }
  fileSelected(event)
  {
    var prev_img = this.img_arr[0];
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
    this.file_error =true;
    if(prev_img != "../../../assets/bqlogo.png")
    {
      this.loader.start();
      this.productsService.updateImages(this.id,this.file).subscribe(
        data => {
          this.loader.stop();
          if(data['state'] == 'success')
          {
            this.toastr.success('Image updated !');
          }
          else
          {
            this.toastr.error('Server Error');
          }
        }
      )
    }
    // this.filename = event.target.files[0].name;
  }
  clearFormArrayUpdate()
  {
    while((this.products_form.controls['variants'] as FormArray).length !=0)
    {
      (this.products_form.controls['variants'] as FormArray).removeAt(0);
    }
  }
  // get variants(){  return this.products_form.get('variants') as FormArray }

  store_focus()
  {
    this.store_error = true;
    return;
  }
  category_focus()
  {
    this.category_error = true;
    return;
  }
  name_focus()
  {
    this.name_error = true;
    return;
  }
  hsn_focus()
  {
    this.hsn_error = true;
    return;
  }
  status_focus()
  {
    this.status_error = true;
    return;
  }
  description_focus()
  {
    this.description_error = true;
    return;
  }
  gst_per_focus()
  {
    this.gst_per_error = true;
    return;
  }
  commission_focus()
  {
    this.commission_per_error = true;
    return;
  }
  updateChangedTableRowClick(value,store)
  {

    var imgs = [];
    console.log(value);
    if((this.products_form.controls['variants'] as FormArray).length == 0)
    {
      for(let ss of this.products)
      {
        for(var s of ss['products'])
        {
          if(s['_id'] == value)
        {
          for(var j of s['images'])
          {
            imgs.push("https://basketqueen.in/uploads/products/"+j+"?dummy=34344");
          }
          if(store == true)
          {
              this.hsn_visible = true;
          }
          else
          {
            this.hsn_visible = false;
          }
          this.img_names_arr = s['images'];
          console.log(this.img_names_arr);
          this.img_names_arr_hidden = false;
          }
          if(value === s._id)
          {
            this.id = value;
            let parentArray = <FormArray>this.products_form.controls['variants'];

              s['variants'].forEach(parent => {

                    const fb = this.createVariantsAdd();
                    fb.patchValue(parent);
                    parentArray.push(fb);
                });
              this.products_form.patchValue({
                name: s.name,
                gst_per: s.gst_per,
                hsn:s.hsn,
                percentage: s.slab_amt,
                description:s.description,
                status: s.status,

              });
          }
        }
      }
      this.img_arr = imgs;
    }
    else
      {
        this.img_arr = [];
          this.clearFormArrayUpdate();
          for(let ss of this.products)
          {
            for(var s of ss['products'])
            {
              if(value === s['_id'])
            {
              this.id = value;
              for(var j of s['images'])
              {
                imgs.push("https://basketqueen.in/uploads/products/"+j+"?dummy=34344");
              }
              console.log("HSN"+s['hsn']);
              console.log("STORE"+s['store']);
              if(store == true)
              {
                  this.hsn_visible = true;
              }
              else
              {
                this.hsn_visible = false;
              }
              this.img_names_arr = s['images'];
              console.log(this.img_names_arr);
              this.img_names_arr_hidden = false;
              console.log((this.products_form.controls['variants'] as FormArray));
              let parentArray = <FormArray>this.products_form.controls['variants'];

                s['variants'].forEach(parent => {
                      const fb = this.createVariantsAdd();
                      fb.patchValue(parent);
                      parentArray.push(fb);
                  });
                  console.log('NAME'+s['name']);
                  this.products_form.patchValue({
                    name: s.name,
                    gst_per: s.gst_per,
                    hsn:s.hsn,
                    returnable:s.returnable,
                    percentage: s.slab_amt,
                    description:s.description,
                    status: s.status,

                  });
                }
            }
          }
          this.img_arr = imgs;
      }
  }
  onRowClicked(id)
  {
    var imgs = [];
    for(var i of this.products)
    {
      if(i['_id'] == id)
      {
        for(var j of i['images'])
        {
          imgs.push("https://basketqueen.in/uploads/products/"+j+"?dummy=34344");
        }

      }
      this.img_arr = imgs;
    }
  }
  updateProduct()
  {
    // if(this.img_arr[0] === "../../../assets/bqlogo.png")
    // {
    //   this.file_error = false;
    //   return;
    // }
    if(this.products_form.get('name').value === '')
    {
      this.name_error = false;
      return;
    }
    if(this.products_form.get('status').value === '')
    {
      this.status_error = false;
      return;
    }
    if(this.products_form.get('gst_per').value === '')
    {
      this.gst_per_error = false;
      return;
    }
    if(this.products_form.get('percentage').value === '')
    {
      this.commission_per_error = false;
      return;
    }
    const files = this.file === undefined ? [] : this.file;
    this.loader.start();

    let name = this.products_form.get('name').value;
    let status = this.products_form.get('status').value;
    let hsn = this.products_form.get('hsn').value;
    let percentage = this.products_form.get('percentage').value;
    let returnable = this.products_form.get('returnable').value;
    let description = this.products_form.get('description').value;
    let gst_per = this.products_form.get('gst_per').value;
    let variants = this.products_form.get('variants').value;
      this.productsService.updateProduct(description,this.id,returnable,gst_per,name,status,percentage,variants,[],hsn).subscribe(
      data=> {
        console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Product updated successfully!');
          this.getStores();
          this.getProducts();
        }
        else
        {
          this.toastr.error('Server Error');
        }
      }
    )
  }
  deleteProduct(id,store)
  {

    this.loader.start();
    this.productsService.deleteProduct(id,store).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Product deleted successfully !');
          this.getStores();
        }
        else
        {
          this.toastr.error('Server Error');
        }
      }
    )
  }
}
