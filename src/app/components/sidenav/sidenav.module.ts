import { NgModule } from '@angular/core';
import { CommonModule, LocationStrategy, PathLocationStrategy, HashLocationStrategy } from '@angular/common';
import { SidenavComponent } from './sidenav.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [SidenavComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  // providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}]
})
export class SidenavModule { }
