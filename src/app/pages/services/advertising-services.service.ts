import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AdvertisingServicesService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }

  addService(name,contact,contact_person_name,address,service_type,file,description)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      let options = {
        headers: new HttpHeaders().set('Authorization','Bearer '+token).set('Accept','application/json')
      };
      const params = new FormData();
      params.set('name',name);
      params.set('description',description);
      params.set('contact',contact);
      params.set('contact_person_name',contact_person_name);
      params.set('address',address);
      params.set('service_type',service_type);
      for(var i of file)
      {
        params.append('images',i,i['name']);
      }
      return this.http.post(this.baseURL+'services/add_service',params,options);
  }
  deleteService(id)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
      };
    const params = new URLSearchParams();
    params.set('id',id);
    return this.http.post(this.baseURL+"services/delete_service",params.toString(),options);
  }
  getServices()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return this.http.get(this.baseURL+'services/get_services');
  }

}
