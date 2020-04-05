import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


import { CustomerRoutingModule } from './customer-routing.module';

import { CreateCustomerComponent } from './create-customer.component';
import { ListCustomerComponent } from './list-customer.component';
import { SharedModule } from "../shared/shared.module";
import {MatSlideToggleModule} from '@angular/material/slide-toggle';



@NgModule({
  declarations: [
    CreateCustomerComponent,
    ListCustomerComponent

  ],
  imports: [
    FormsModule,
    CustomerRoutingModule,
    SharedModule,
    MatSlideToggleModule
  ],
  exports: [
    ListCustomerComponent,
    CreateCustomerComponent
  ]
})
export class CustomerModule { }
