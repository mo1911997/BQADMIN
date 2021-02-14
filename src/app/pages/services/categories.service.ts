import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  // tslint:disable-next-line: typedef
  addCategory(name,description,store,file)
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
    params.set('name',name);
    params.set('image',file,file.name);
    params.set('description',description);
    params.set('store',store);

    return this.http.post(this.baseURL+"categories/add_category",params,options);
  }

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

    return this.http.post(this.baseURL+"categories/update_images",params,options);
  }
  // tslint:disable-next-line: typedef
  updateCategory(id,name,description,store,file)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token).set('Accept','application/json')
      };
      const params = new URLSearchParams();
    params.set('id',id);
    params.set('name',name);
    params.set('description',description);
    params.set('store',store);
    // params.set('image',file,file.name);

    return this.http.post(this.baseURL+"categories/update_category",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  deleteCategory(id)
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
    return this.http.post(this.baseURL+"categories/delete_category",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  getCategories()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    console.log(token);
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
    };
    return this.http.get(this.baseURL+"categories/get_categories",options);
  }
}
