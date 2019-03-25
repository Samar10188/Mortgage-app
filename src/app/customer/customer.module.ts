import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


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
    FormsModule,
    CustomerRoutingModule,
    SharedModule
  ],
  exports: [
    ListCustomerComponent,
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
