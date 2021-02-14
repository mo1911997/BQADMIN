import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  baseURL ="https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  // tslint:disable-next-line: typedef
  getUsers()
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded').set('Authorization','Bearer '+token)
      };
      return this.http.get(this.baseURL+"users/get_users",options);
  }
}
