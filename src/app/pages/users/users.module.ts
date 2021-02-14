import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { NgxPaginationModule } from 'ngx-pagination';
import { UserDetailsComponent } from './user-details/user-details.component';


@NgModule({
  declarations: [UsersComponent, UserDetailsComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    Ng2SearchPipeModule,
    NgxPaginationModule,
  ]
})
export class UsersModule { }
