import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DeliveryAgentsService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  // tslint:disable-next-line: typedef
  addDeliveryAgent(name,contact,address,password,store)
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
    params.set('name',name);
    params.set('contact',contact);
    params.set('address',address);
    params.set('password',password);
    params.set('store_id',store);
    return this.http.post(this.baseURL+"delivery_boys/add_delivery_boy",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  updateDeliveryAgent(id,name,contact,address,store)
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
    params.set('name',name);
    params.set('contact',contact);
    params.set('address',address);
    params.set('store_id',store);
    return this.http.post(this.baseURL+"delivery_boys/update_delivery_boy",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  deleteDeliveryAgent(id)
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
    console.log(token);
    params.set('id',id);
    return this.http.post(this.baseURL+"delivery_boys/delete_delivery_boy",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  getDeliveryAgents()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    const params = new URLSearchParams();
    console.log(localStorage.getItem('subadmin_token'));
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    return this.http.get(this.baseURL+"delivery_boys/get_delivery_boys",options);
  }
  getCashInHandHistory()
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
    return this.http.get(this.baseURL+"delivery_boys/get_cash_in_hand_history_admin",options);
  }
  clear_payment(dboy,amount)
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
    var indiaTime = new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata",hour: 'numeric', minute: 'numeric', hour12: true });
    console.log(indiaTime);
    console.log(amount);
    console.log(dboy);
    return;
    params.set('date','');
    params.set('amount',amount);
    params.set('mode','full');
    params.set('dboy',dboy);

    return this.http.post(this.baseURL+"delivery_boys/clear_dboy_cash_in_hand",params.toString(),options);
  }
}
