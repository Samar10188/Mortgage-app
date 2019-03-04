import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { CustomerRoutingModule } from './customer-routing.module';

import { CreateCustomerComponent } from './create-customer.component';
import { ListCustomerComponent } from './list-customer.component';
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [
    CreateCustomerComponent,
    ListCustomerComponent
  ],
  imports: [
    CustomerRoutingModule,
    SharedModule
  ],
  exports: [
    ListCustomerComponent,
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
