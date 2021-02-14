import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { CategoriesService } from '../services/categories.service';
import { StoresService } from '../services/stores.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  id:any;
  term:any;
  file : any;
  p:any;
  filter:any;
  store_error = true;
  img_name_hidden = true;
  img_name;
  file_error = true;
  name_error = true;
  img_src : string = "../../../assets/bqlogo.png";
  filename : any;
  categories_form = new FormGroup({
    name: new FormControl(''),
    description:new FormControl(''),
    store: new FormControl('')
  });
  categories:any;
  stores:any;
  constructor(private loader:NgxUiLoaderService,private toastr:ToastrService,private categoriesService: CategoriesService,private storesService:StoresService) { }

  ngOnInit(): void {
    this.getCategories();
    this.getStores();
  }
  nameFocus()
  {
    this.name_error = true;
  }
  storeFocus()
  {
    this.store_error = true;
  }
  addCategory()
  {
    if(this.img_src === "../../../assets/bqlogo.png")
    {
      this.file_error = false;
      return;
    }
    if(this.categories_form.get('store').value == "")
    {
      this.store_error = false;
      return;
    }
    if(this.categories_form.get('name').value == "")
    {
      this.name_error = false;
      return;
    }
    this.loader.start();
    let name = this.categories_form.get('name').value;
    let description = this.categories_form.get('description').value;
    let store = this.categories_form.get('store').value;
    this.categoriesService.addCategory(name,description,store,this.file).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] === 'success')
        {
          this.toastr.success('Category added successfully !');
          this.getCategories();
          this.img_src  = "../../../assets/bqlogo.png" ;
          this.img_name_hidden = true;
          this.filename = "";
          this.categories_form.reset();
        }
        else
        {
          this.toastr.error('Please try again later !');
        }
      }
    )
  }
  updateCategory()
  {
    if(this.categories_form.get('store').value == "")
    {
      this.store_error = false;
      return;
    }
    if(this.categories_form.get('name').value == "")
    {
      this.name_error = false;
      return;
    }
    if(this.file === undefined)
    {
      this.file = "";
    }
    this.loader.start();
    let name = this.categories_form.get('name').value;
    let description = this.categories_form.get('description').value;
    let store = this.categories_form.get('store').value;
    this.categoriesService.updateCategory(this.id,name,description,store,this.file).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Category updated successfully !');
          this.getCategories();
          this.filename = "";
          this.img_name_hidden = true;
          this.categories_form.reset();
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  onRowClicked(id)
  {
    this.id = id;
    for(var i of this.categories)
    {
      if(i['_id'] == id)
      {
        this.img_src = "https://basketqueen.in/uploads/categories/"+i['img_url']+"?dummy=34344";
        this.categories_form.patchValue({
          name: i['name'],
          description: i['description'],
          store: i['store']['_id']
        });
        this.img_name = i['img_url'];
        this.img_name_hidden = false;
      }
    }
  }
  deleteCategory(id)
  {
    this.loader.start();
    this.categoriesService.deleteCategory(id).subscribe(
      data => {
      console.log(data);
        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Category deleted successfully !');
          this.getCategories();
          this.filename = "";
          // this.categories_form.reset();
        }
        else
        {
          this.toastr.error('Please try again later !');
        }
      }
    )
  }
  getCategories()
  {
    this.categoriesService.getCategories().subscribe(
      data => {

        if(data['state'] == 'success')
        {
          this.categories = data['data'];
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
        this.stores = data['data'];
      }
    )
  }
  fileSelected(event)
  {
    var prev_img = this.img_src;
    this.file = event.target.files[0];
    this.filename = event.target.files[0].name;
    // const reader = new FileReader();
    // reader.onload = e => this.img_src = reader.result.toString();
    // reader.readAsDataURL(event.target.files[0]);
    var reader = new FileReader();

    reader.onload = (event:any) => {
        this.img_src = event.target.result;
        if(prev_img != "../../../assets/bqlogo.png")
        {
          this.loader.start();
          this.categoriesService.updateImages(this.id,this.file).subscribe(
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
    }
    reader.readAsDataURL(event.target.files[0]);
    this.file_error = true;
  }
}
