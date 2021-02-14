import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseURL = "https://basketqueen.in/api/";
  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  checkLogin(contact, password,role)
  {
    if(role == false || role == "")
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      params.set('password',password);

      return this.http.post(this.baseURL+"admins/login",params.toString(),options);
    }
    else
    {
      const params = new URLSearchParams();
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      params.set('contact',contact);
      params.set('password',password);

      return this.http.post(this.baseURL+"subadmins/login",params.toString(),options);
    }

  }
  // tslint:disable-next-line: typedef
  getEmailChangePassword(email)
  {
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    params.set('email',email);

    return this.http.post(this.baseURL+"",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  verifyOTPChangePassword(email, otp)
  {
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    params.set('email',email);
    params.set('otp',otp);

    return this.http.post(this.baseURL+"",params.toString(),options);
  }
  // tslint:disable-next-line: typedef
  changePassword(email, password)
  {
    const params = new URLSearchParams();
    let options = {
      headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
    };
    params.set('email',email);
    params.set('password',password);

    return this.http.post(this.baseURL+"",params.toString(),options);
  }
}
