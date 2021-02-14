import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl } from '@angular/forms';
import { ChangePasswordService } from '../services/change-password.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';
import { thistle } from 'color-name';

@Component({
  selector: 'app-verify-otp-change-password',
  templateUrl: './verify-otp-change-password.component.html',
  styleUrls: ['./verify-otp-change-password.component.css']
})
export class VerifyOtpChangePasswordComponent implements OnInit {
  verifyOTPForm = new FormGroup({
    otp:new FormControl('')
  });
  contact:any;
  otp_hidden = true;
  otp_error = "";
  constructor(private toastr:ToastrService,private router:Router,private loader:NgxUiLoaderService,private changePasswordService:ChangePasswordService) { }

  ngOnInit(): void {
    this.contact = window.history.state.contact;

  }
  otpFocus()
  {
    this.otp_hidden = true;
    return;
  }
  verifyOTP()
  {
    if(this.verifyOTPForm.get('otp').value === '')
    {
      this.otp_error = "** This field is required **";
      this.otp_hidden = false;
      return;
    }
    if(this.verifyOTPForm.get('otp').value.length != 4)
    {
      this.otp_error = "** Invalid otp **";
      this.otp_hidden = false;
      return;
    }
    this.loader.start();
    let otp = this.verifyOTPForm.get('otp').value;
    this.changePasswordService.verifyOTP(this.contact,otp,window.history.state.isAgent).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {

          this.router.navigate(['/change-password'],{state:{contact:this.contact,isAgent:window.history.state.isAgent}});
        }
        else
        {
          this.toastr.error(data['msg']);
        }
      }
    )
  }
  numberOnly(event): boolean {
    const charCode = (event.which) ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;

  }
}
