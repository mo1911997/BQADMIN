import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdvertisingServicesRoutingModule } from './advertising-services-routing.module';
import { AdvertisingServicesComponent } from './advertising-services.component';
import { ReactiveFormsModule } from '@angular/forms';
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
  declarations: [AdvertisingServicesComponent],
  imports: [
    CommonModule,
    AdvertisingServicesRoutingModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot(),
    Ng2SearchPipeModule
  ]
})
export class AdvertisingServicesModule { }
