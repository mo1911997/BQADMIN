import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class SubadminsService {
  baseURL = "https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }

  // tslint:disable-next-line: typedef
  addSubadmin(name,contact,password,city)
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
    params.set('city',city);
    params.set('password',password);

    return this.http.post(this.baseURL+"subadmins/add_subadmin",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  updateSubadmin(id,name,contact,city)
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
    params.set('city',city);
    params.set('contact',contact);

    return this.http.post(this.baseURL+"subadmins/update_subadmin",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  deleteSubadmin(id)
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

    return this.http.post(this.baseURL+"subadmins/delete_subadmin",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  getSubadmins()
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
    return this.http.get(this.baseURL+"subadmins/get_subadmins",options);
  }
}
