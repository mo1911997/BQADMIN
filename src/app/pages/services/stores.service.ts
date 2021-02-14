import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as CryptoJS from 'crypto-js';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class StoresService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  // tslint:disable-next-line: typedef
  addStore(offline,gst_registered,name,contact,address,owner_name,password,minimum_order,open_time,close_time,delivery_type,store_category,file,cities,latitude,longitude,gst_no,pan_no)
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
    params.set('name',name);
    params.set('offline',offline);
    params.set('contact',contact);
    params.set('address',address);
    params.set('owner_name',owner_name);
    params.set('password',password);
    params.set('cities',JSON.stringify(cities));
    params.set('minimum_order',minimum_order);
    params.set('open_time',open_time);
    params.set('gst_no',gst_no);
    params.set('pan_no',pan_no);
    params.set('close_time',close_time);
    params.set('gst_registered',gst_registered);
    params.set('delivery_type',delivery_type);
    params.set('store_category',store_category);
    params.set('latitude',latitude);
    params.set('longitude',longitude);
    params.set('image',file,file.name);
    return this.http.post(this.baseURL+"stores/add_store",params,options);
  }
  // tslint:disable-next-line: typedef
  updateStore(offline,gst_registered,id,name,contact,address,owner_name,minimum_order,open_time,close_time,delivery_type,store_category,file,cities,latitude,longitude,gst_no,pan_no)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token).set('Accept','applications/json')
    };
    params.set('id',id);
    params.set('name',name);
    params.set('contact',contact);
    params.set('address',address);
    params.set('owner_name',owner_name);
    params.set('minimum_order',minimum_order);
    params.set('open_time',open_time);
    params.set('latitude',latitude);
    params.set('longitude',longitude);
    params.set('gst_registered',gst_registered);
    params.set('offline',offline);
    params.set('gst_no',gst_no);
    params.set('pan_no',pan_no);
    params.set('close_time',close_time);
    params.set('cities',JSON.stringify(cities));
    params.set('delivery_type',delivery_type);
    params.set('store_category',store_category);
    // params.set('image',file === undefined ? file2 :file,file === undefined ? '' :file.name);

    return this.http.post(this.baseURL+"stores/update_store",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  updateImages(id,file)
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
    params.set('image',file,file.name);

    return this.http.post(this.baseURL+"stores/update_images",params,options);
  }

  deleteStore(id)
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

    return this.http.post(this.baseURL+"stores/delete_store",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  getStoresDisplay(page)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    console.log(page);
    const params = new URLSearchParams();
    params.set('page',page);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    return this.http.post(this.baseURL+"stores/get_stores_display",params.toString(),options);
  }
  getStores()
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
    return this.http.post(this.baseURL+"stores/get_stores",null,options);
  }
  getPaymentsHistory()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    // console.log(localStorage.getItem('subadmin_token'));
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    return this.http.get(this.baseURL+"stores/get_cleared_payments_history_admin",options);
  }
  clear_payment(store,amount)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    // console.log(localStorage.getItem('subadmin_token'));
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    params.set('date','');
    params.set('amount',amount);
    params.set('mode','full');
    params.set('store',store);

    return this.http.post(this.baseURL+"stores/clear_store_payment",params.toString(),options);
  }

  get_store_report(id)
  {
    const params = new URLSearchParams();
    // console.log(localStorage.getItem('subadmin_token'));
    let  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    params.set('id',id);
    return this.http.post(this.baseURL+"reports/get_stores_with_categories_and_products",params.toString(),{headers,responseType: 'blob'});
  }
}
