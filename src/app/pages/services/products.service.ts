import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  // tslint:disable-next-line: typedef
  addProduct(description,returnable,gst_per,store,name,category,status,percentage,variants,files,hsn)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new FormData();
    let options = {
      headers: new HttpHeaders().set('Authorization','Bearer '+token).set('Accept','application/json')
    };

    console.log("HSNHSN"+hsn);
    params.set('name',name);
    params.set('returnable',returnable);
    params.set('store',store);
    params.set('category',category);
    params.set('hsn',hsn);
    params.set('description',description);
    params.set('slab_amt',percentage);
    params.set('gst_per',gst_per);
    params.set('status',status);
    for(var i of files)
    {
      params.append('images',i,i['name']);
    }
    params.set('variants',JSON.stringify(variants));

    return this.http.post(this.baseURL+"products/add_product",params,options);
  }
  // tslint:disable-next-line: typedef
  updateProduct(description,id,returnable,gst_per,name,status,percentage,variants,files,hsn)
  {
    console.log(id);
    console.log(returnable);
    console.log(gst_per);
    console.log(name);
    console.log(status);
    console.log(percentage);
    console.log(variants);
    //console.log(files);
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token).set('Accept','application/json')
    };
    params.set('id',id);
    params.set('hsn',hsn);
    params.set('name',name);
    params.set('slab_amt',percentage);
    params.set('returnable',returnable);
    params.set('description',description);
    params.set('gst_per',gst_per);
    params.set('status',status);
    // for(var i of files)
    // {
    //   // tslint:disable-next-line: whitespace
    //   console.log(i['name']);
    //   params.append('images',i,i['name']);
    // }
    params.set('variants',JSON.stringify(variants));
    return this.http.post(this.baseURL+"products/update_product",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  deleteProduct(id,store)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    params.set('id',id);
    params.set('store',store);
    return this.http.post(this.baseURL+"products/delete_product",params.toString(),options);
  }
  // tslint:disable-next-line: typedef

  updateImages(id,files)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    // const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Authorization','Bearer '+token).set('Accept','application/json')
    };
    const params = new FormData();
    params.set('id',id);
    for(var i of files)
    {
      // tslint:disable-next-line: whitespace
      console.log(i['name']);
      params.append('images',i,i['name']);
    }

    return this.http.post(this.baseURL+"products/update_images",params,options);
  }
  getProducts()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    return this.http.get(this.baseURL+"products/get_products",options);
  }
}
