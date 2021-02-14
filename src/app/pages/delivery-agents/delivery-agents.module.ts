import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DeliveryAgentsRoutingModule } from './delivery-agents-routing.module';
import { DeliveryAgentsComponent } from './delivery-agents.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ToastrModule } from 'ngx-toastr';
import {
  NgxUiLoaderModule,
  NgxUiLoaderConfig,
  SPINNER,
  POSITION,
  PB_DIRECTION
} from 'ngx-ui-loader';
import { PaymentsHistoryComponent } from './payments-history/payments-history.component';

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
  declarations: [DeliveryAgentsComponent, PaymentsHistoryComponent],
  imports: [
    CommonModule,
    DeliveryAgentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    Ng2SearchPipeModule
  ]
})
export class DeliveryAgentsModule { }
