import { NgModule } from '@angular/core';
import { SharedModule } from "../shared/shared.module";

import { CustomerRoutingModule } from './customer-routing.module';

import { CreateCustomerComponent } from './create-customer.component';
import { ListCustomerComponent } from './list-customer.component';

@NgModule({
  declarations: [
    CreateCustomerComponent,
    ListCustomerComponent
  ],
  imports: [
    SharedModule,
    CustomerRoutingModule
  ],
  exports: [
    ListCustomerComponent,
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
