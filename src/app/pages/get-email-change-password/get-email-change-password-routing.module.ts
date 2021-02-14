import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GetEmailChangePasswordComponent } from './get-email-change-password.component';

const routes: Routes = [
  {
    path: '',
    component: GetEmailChangePasswordComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GetEmailChangePasswordRoutingModule { }
