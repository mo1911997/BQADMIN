import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { OrdersComponent } from './orders.component';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
const routes: Routes = [
  {
    path:'',
    component:OrdersComponent
  },
  {
    path: 'past-orders',
    component: PastOrdersComponent
  },
  {
    path: 'order-details',
    component: OrderDetailsComponent
  },
  {
    path: 'store-orders',
    component: StoreOrdersComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrdersRoutingModule { }
