import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
@Injectable({
  providedIn: 'root'
})
export class BannersService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http:HttpClient,private cookieService:CookieService) { }
  addBanner(store,category,product)
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
    params.set('store',store);
    params.set('category',category);
    params.set('product',product);
    return this.http.post(this.baseURL+'banners/add_banner',params.toString(),options);
  }
  deleteBanner(id)
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
      return this.http.post(this.baseURL+'banners/delete_banner',params.toString(),options);
  }
  getBanners()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      return this.http.get(this.baseURL+'banners/get_banners');
  }
}
