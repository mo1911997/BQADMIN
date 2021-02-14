import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup } from '@angular/forms';
import { ChangePasswordService } from '../services/change-password.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-get-email-change-password',
  templateUrl: './get-email-change-password.component.html',
  styleUrls: ['./get-email-change-password.component.css']
})
export class GetEmailChangePasswordComponent implements OnInit {
  getContactChangePasswordForm = new FormGroup({
    contact: new FormControl(''),
    chck:new FormControl('')
  });
  contact_hidden = true;
  contact_error = "";

  constructor(private toastr:ToastrService,private loader:NgxUiLoaderService,private router: Router,private changePasswordService:ChangePasswordService) { }

  ngOnInit(): void {

  }
  contactFocus()
  {
    this.contact_hidden = true;
  }
  goToVerifyOTP()
  {
    if(this.getContactChangePasswordForm.get('contact').value === '')
    {
      console.log('inhere');
      this.contact_error = '** This field is required **';
      this.contact_hidden = false;
      return;
    }
    if(this.getContactChangePasswordForm.get('contact').value.length != 10)
    {
      this.contact_error = '** Invalid contact **';
      this.contact_hidden = false;
      return;
    }
    this.loader.start();
    let contact = this.getContactChangePasswordForm.get('contact').value;
    this.changePasswordService.getContact(contact,this.getContactChangePasswordForm.get('chck').value).subscribe(
      data => {

        this.loader.stop();
        if(data['state'] == 'success')
        {
          this.router.navigate(['/verify-otp-change-password'],{ state: { contact: this.getContactChangePasswordForm.get('contact').value ,isAgent:this.getContactChangePasswordForm.get('chck').value} });
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
  onCheckboxChecked(event)
  {


  }
}
