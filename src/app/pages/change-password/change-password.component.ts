import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangePasswordService } from '../services/change-password.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm = new FormGroup({
    newPwd:new FormControl(''),
    confirmPwd:new FormControl(''),
  });
  contact:any;
  newPwd_hidden = true;
  cpwd_error = '';
  newPwd_error = '';
  cpwd_hidden = true;
  constructor(private toastr:ToastrService,private router:Router,private loader:NgxUiLoaderService,private changePasswordService:ChangePasswordService) { }

  ngOnInit(): void {
    this.contact = window.history.state.contact;
  }
  // tslint:disable-next-line: typedef
  newPwdFocus()
  {
    this.newPwd_hidden = true;
    return;
  }
  cpwdFocus()
  {
    this.cpwd_hidden = true;
    return;
  }
  changePassword()
  {
    if(this.changePasswordForm.get('newPwd').value === '')
    {
      this.newPwd_error = "** This field is required **";
      this.newPwd_hidden = false;
      return;
    }
    if(this.changePasswordForm.get('confirmPwd').value.length === '')
    {
      this.cpwd_error = "** This field is required **";
      this.cpwd_hidden = false;
      return;
    }
    this.loader.start();
    let password = this.changePasswordForm.get('confirmPwd').value;
    let contact = this.contact;
    this.changePasswordService.changePassword(contact,password,window.history.state.isAgent).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.toastr.success('Password updated !');
          this.router.navigate(['/login']);
        }
        else
        {
          this.toastr.success('Please try agail later !');
        }
      }
    )
  }
}
