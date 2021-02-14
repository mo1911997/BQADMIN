import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StoresComponent } from './stores.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';

const routes: Routes = [
  {
    path:'',
    component:StoresComponent
  },
  {
    path:'payments-history',
    component:PaymentsHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StoresRoutingModule { }
