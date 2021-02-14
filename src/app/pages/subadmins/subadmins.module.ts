import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SubadminsRoutingModule } from './subadmins-routing.module';
import { SubadminsComponent } from './subadmins.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
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
  declarations: [SubadminsComponent],
  imports: [
    CommonModule,
    SubadminsRoutingModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    FormsModule,
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class SubadminsModule { }
