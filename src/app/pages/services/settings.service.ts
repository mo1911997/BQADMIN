import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor(private http: HttpClient) { }
  // tslint:disable-next-line: typedef
  getSettings()
  {

  }
  // tslint:disable-next-line: typedef
  updateSettings()
  {
    
  }
}
