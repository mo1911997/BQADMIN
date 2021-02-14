import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { LoginService } from '../services/login.service';
import { CookieService } from 'ngx-cookie-service';
import * as CryptoJS from 'crypto-js';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    contact: new FormControl(''),
    chck: new FormControl(''),
    password: new FormControl('')
  })
  contact_hidden = true;
  password_hidden = true;
  contact_error = "";
  constructor(private toastr:ToastrService,private loader:NgxUiLoaderService, private cookieService: CookieService ,private router: Router,private loginService: LoginService) { }

  ngOnInit(): void {

  }
  onCheckboxChecked(event)
  {

  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
  contactFocus()
  {
    this.contact_hidden = true;
  }
  passwordFocus()
  {
    this.password_hidden = true;
  }
  
  checkLogin()
  {
    if(this.loginForm.get('contact').value === '')
    {
      console.log('inhere');
      this.contact_error = '** This field is required **';
      this.contact_hidden = false;
      return;
    }
    if(this.loginForm.get('contact').value.length != 10)
    {
      this.contact_error = '** Invalid contact **';
      this.contact_hidden = false;
      return;
    }
    if(this.loginForm.get('password').value === '')
    {
      this.password_hidden = false;
      return;
    }

    this.loader.start();
    this.loginService.checkLogin(this.loginForm.get('contact').value,this.loginForm.get('password').value,this.loginForm.get('chck').value).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Logged in !');
          if(data['role'] == "Admin")
          {
            this.cookieService.set('at',CryptoJS.AES.encrypt(JSON.stringify(data['token']), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC").toString());
            this.cookieService.set('rl',CryptoJS.AES.encrypt(JSON.stringify(data['role']), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC").toString());
            // localStorage.setItem('admin_token',data['token']);
            this.router.navigate(['/sidenav/stores']);
          }
          else
          {
            this.cookieService.set('at',CryptoJS.AES.encrypt(JSON.stringify(data['token']), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC").toString());
            this.cookieService.set('rl',CryptoJS.AES.encrypt(JSON.stringify(data['role']), "sads*&!*(*(CHAHSC*(HA(SCHASCHA(SHC").toString());
            this.router.navigate(['/sidenav/stores']);
          }
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  forgotPasswordClick()
  {
    this.router.navigate(['/get-contact-change-password']);
  }
}
