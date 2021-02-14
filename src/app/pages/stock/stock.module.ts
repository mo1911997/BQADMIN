import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StockRoutingModule } from './stock-routing.module';
import { StockComponent } from './stock.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [StockComponent],
  imports: [
    CommonModule,
    StockRoutingModule,
    NgxPaginationModule,
    Ng2SearchPipeModule
  ]
})
export class StockModule { }
