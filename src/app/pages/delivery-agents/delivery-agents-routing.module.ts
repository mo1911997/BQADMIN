import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DeliveryAgentsComponent } from './delivery-agents.component';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';
const routes: Routes = [
  {
    path:'',
    component: DeliveryAgentsComponent
  },
  {
    path:'payments-history',
    component: PaymentsHistoryComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeliveryAgentsRoutingModule { }
