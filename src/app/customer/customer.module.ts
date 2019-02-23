import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CreateCustomerComponent } from './create-customer.component';
import { ListCustomerComponent } from './list-customer.component';

@NgModule({
  declarations: [CreateCustomerComponent, ListCustomerComponent],
  imports: [
    CommonModule,
    CustomerRoutingModule
  ]
})
export class CustomerModule { }
