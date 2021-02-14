import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SubadminsComponent } from './subadmins.component';
const routes: Routes = [
  {
    path: '',
    component: SubadminsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubadminsRoutingModule { }
