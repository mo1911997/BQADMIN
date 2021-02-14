import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrdersRoutingModule } from './orders-routing.module';
import { OrdersComponent } from './orders.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PastOrdersComponent } from './past-orders/past-orders.component';
import { OrderDetailsComponent } from './order-details/order-details.component';
import { StoreOrdersComponent } from './store-orders/store-orders.component';
import {DpDatePickerModule} from 'ng2-date-picker';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';

const ngxUiLoaderConfig: NgxUiLoaderConfig = {
  bgsColor: 'red',
  bgsPosition: POSITION.bottomCenter,
  bgsSize: 40,
  bgsType: SPINNER.rectangleBounce, // background spinner type
  fgsType: SPINNER.rectangleBounce, // foreground spinner type
  pbDirection: PB_DIRECTION.leftToRight, // progress bar direction
  pbThickness: 5 // progress bar thickness
};
@NgModule({
  declarations: [OrdersComponent, PastOrdersComponent, OrderDetailsComponent, StoreOrdersComponent],
  imports: [
    CommonModule,
    OrdersRoutingModule,
    FormsModule,ReactiveFormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgxPaginationModule,
    DpDatePickerModule,
    Ng2SearchPipeModule
  ]
})
export class OrdersModule { }
