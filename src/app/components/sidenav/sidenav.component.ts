import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { fadeAnimation } from '../../animations/FadeAnimation';
import * as CryptoJS from 'crypto-js';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css'],
  animations: [fadeAnimation]
})
export class SidenavComponent implements OnInit {
  hide_subadmin_url :any = false;
  constructor(private router:Router,private cookieService:CookieService) { }

  ngOnInit(): void {
    let token;
    const bytes = CryptoJS.AES.decrypt(this.cookieService.get('rl'), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC");
      if (bytes.toString()) {
        token = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      }
    if(token == "Subadmin")
    {
      this.hide_subadmin_url = true;
    }
    if(this.cookieService.get('at') == null || this.cookieService.get('at') === undefined || this.cookieService.get('at') === "")
    {

      this.router.navigate(['/login']);
      return;
    }
  }
  logout()
  {
    this.cookieService.delete('at');
    this.cookieService.delete('rl');
    this.router.navigate(['/login']);
  }
  public getRouterOutletState(outlet) {
    return outlet.isActivated ? outlet.activatedRoute : '';
  }
}
