import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ChangePasswordService {
  baseURL = "https://basketqueen.in/api/";
  constructor(private http:HttpClient) { }
  getContact(contact,isAgent)
  {
    if(isAgent == "" || isAgent == undefined || isAgent == false)
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      return this.http.post(this.baseURL+'admins/get_contact_change_password',params.toString(),options);
    }
    else
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      return this.http.post(this.baseURL+'subadmins/get_contact_change_password',params.toString(),options);
    }

  }
  verifyOTP(contact,otp,isAgent)
  {
    if(isAgent === '' || isAgent === undefined || isAgent === false)
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      params.set('otp',otp);
      return this.http.post(this.baseURL+'admins/verify_otp_forgot_password',params.toString(),options);
    }
    else
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      params.set('otp',otp);
      return this.http.post(this.baseURL+'subadmins/verify_otp_forgot_password',params.toString(),options);
    }

  }
  changePassword(contact,password,isAgent)
  {
    if(isAgent === '' || isAgent === undefined || isAgent === false)
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      params.set('password',password);
      return this.http.post(this.baseURL+'admins/change_password',params.toString(),options);
    }
    else
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      params.set('password',password);
      return this.http.post(this.baseURL+'subadmins/change_password',params.toString(),options);
    }
  }
}
