import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdvertisingServicesComponent } from './advertising-services.component';
const routes: Routes = [
  {
    path:'',
    component:AdvertisingServicesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdvertisingServicesRoutingModule { }
