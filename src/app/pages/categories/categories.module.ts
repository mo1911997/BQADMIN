import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CategoriesRoutingModule } from './categories-routing.module';
import { CategoriesComponent } from './categories.component';
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
  declarations: [CategoriesComponent],
  imports: [
    CommonModule,
    CategoriesRoutingModule,
    ToastrModule.forRoot(),
    NgxUiLoaderModule.forRoot(ngxUiLoaderConfig),
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class CategoriesModule { }
