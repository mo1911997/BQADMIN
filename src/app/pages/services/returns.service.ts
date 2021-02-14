import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class ReturnsService {
  baseURL = "https://basketqueen.in/api/";
  constructor(private cookieService: CookieService,private http:HttpClient) { }
  getRequests()
  {

    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    let options = {
      headers: new HttpHeaders().set('Authorization','Bearer '+token).set('Accept','application/json')
    };
    return this.http.get(this.baseURL+"returns/get_requests_admin",options);
  }
  updateReturnRequest(id,items,orderid)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    let options = {
      headers: new HttpHeaders().set('Authorization','Bearer '+token).set('Content-Type', 'application/x-www-form-urlencoded').set('Accept','application/json')
    };
    const params = new URLSearchParams();
    params.set('id',id);
    params.set('order_id',orderid);
    params.set('items',JSON.stringify(items));
    console.log(params);
    return this.http.post(this.baseURL+"returns/update_return",params.toString(),options);
  }
}
