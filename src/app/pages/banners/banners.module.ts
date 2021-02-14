import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BannersRoutingModule } from './banners-routing.module';
import { BannersComponent } from './banners.component';
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
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  declarations: [BannersComponent],
  imports: [
    CommonModule,
    BannersRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule,
    ReactiveFormsModule,
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ToastrModule.forRoot()
  ]
})
export class BannersModule { }
