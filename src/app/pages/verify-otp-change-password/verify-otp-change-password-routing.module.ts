import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VerifyOtpChangePasswordComponent } from './verify-otp-change-password.component';

const routes: Routes = [
  {
    path: '',
    component: VerifyOtpChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VerifyOtpChangePasswordRoutingModule { }
