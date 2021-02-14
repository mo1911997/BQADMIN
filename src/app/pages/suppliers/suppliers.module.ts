import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SuppliersRoutingModule } from './suppliers-routing.module';
import { SuppliersComponent } from './suppliers.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [SuppliersComponent],
  imports: [
    CommonModule,
    SuppliersRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SuppliersModule { }
