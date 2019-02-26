import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCustomerComponent } from './create-customer.component';
import { ListCustomerComponent } from './list-customer.component';

const routes: Routes = []
//   { path:"list", component: ListCustomerComponent },
//   { path:"create", component: CreateCustomerComponent },
//   { path:"edit", component: CreateCustomerComponent }
// ];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
