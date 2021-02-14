import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  baseURL = "https://basketqueen.in/api/";
  constructor(private http: HttpClient,private cookieService:CookieService) { }
  getOrders(date)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
      let options = {
        headers: new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded')
      };
      const params = new URLSearchParams();
      params.set('date',date);
    return this.http.post(this.baseURL+'orders/get_orders_admin',params.toString(),options);
  }
  changeOrderStatus(status,store,orderid,delboy)
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
      if(delboy === '')
      {
        params.set('flag',"Aaishani Order");
        params.set('store',store);
        params.set('id',orderid);
        params.set('delivery_boy',delboy);
        params.set('order_status',status);
      }
      else
      {
        params.set('store',store);
        params.set('id',orderid);
        params.set('delivery_boy',delboy);
      }
    return this.http.post(this.baseURL+'orders/update_order_status',params.toString(),options);
  }

  generateReport(startDate,endDate)
  {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('at'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }

      var finalStartDate;
      var finalEndDate;
      var x =startDate;
    if(x.toString().split('-')[2].split("")[0] == 0)
    {
      if(x.toString().split('-')[1].split("")[0] == 0)
      {
        finalStartDate = x.toString().split('-')[2].split("")[1]+"/"+x.toString().split('-')[1].split("")[1]+"/"+x.toString().split('-')[0];
        console.log(finalStartDate);
      }
      else
      {
        finalStartDate = x.toString().split('-')[2].split("")[1]+"/"+x.toString().split('-')[1]+"/"+x.toString().split('-')[0];
        console.log(finalStartDate);
      }
    }
    else
    {
      if(x.toString().split('-')[1].split("")[0] == 0)
      {
        finalStartDate = x.toString().split('-')[2]+"/"+x.toString().split('-')[1].split("")[1]+"/"+x.toString().split('-')[0];
        console.log(finalStartDate);
      }
      else
      {
        finalStartDate = x.toString().split('-')[2]+"/"+x.toString().split('-')[1]+"/"+x.toString().split('-')[0];
        console.log(finalStartDate);
      }

    }

    var y =endDate;
    if(y.toString().split('-')[2].split("")[0] == 0)
    {
      if(y.toString().split('-')[1].split("")[0] == 0)
      {
        finalEndDate = y.toString().split('-')[2].split("")[1]+"/"+y.toString().split('-')[1].split("")[1]+"/"+y.toString().split('-')[0];
        console.log(finalEndDate);
      }
      else
      {
        finalEndDate = y.toString().split('-')[2].split("")[1]+"/"+y.toString().split('-')[1]+"/"+y.toString().split('-')[0];
        console.log(finalEndDate);
      }
    }
    else
    {
      if(y.toString().split('-')[1].split("")[0] == 0)
      {
        finalEndDate = y.toString().split('-')[2]+"/"+y.toString().split('-')[1].split("")[1]+"/"+y.toString().split('-')[0];
        console.log(finalEndDate);
      }
      else
      {
        finalEndDate = y.toString().split('-')[2]+"/"+y.toString().split('-')[1]+"/"+y.toString().split('-')[0];
        console.log(finalEndDate);
      }

    }
    console.log(finalStartDate);
    console.log(finalEndDate);
      let  headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
      console.log(startDate);
      console.log(endDate);
      const params = new URLSearchParams();
      console.log(new Date().toLocaleString("en-US", { timeZone: "Asia/Kolkata"}));
      params.append('startDate',finalStartDate);
      params.append('endDate',finalEndDate);
      return this.http.post(this.baseURL+"reports/get_orderwise_report",params.toString(),{headers,responseType: 'blob'});
  }
}
