import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoresRoutingModule } from './stores-routing.module';
import { StoresComponent } from './stores.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

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
  declarations: [StoresComponent, PaymentsHistoryComponent],
  imports: [
    CommonModule,
    StoresRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    NgMultiSelectDropDownModule.forRoot(),
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class StoresModule { }
