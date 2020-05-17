import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { ProductSellRoutingModule } from './product-sell-routing.module';
import { SellProductComponent } from './sell-product/sell-product.component';
import { SoldListComponent } from './sold-list/sold-list.component';

@NgModule({
  declarations: [SellProductComponent, SoldListComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ProductSellRoutingModule
  ]
  // exports: [
  //   SellProductComponent,
  //   SoldListComponent
  // ]
})
export class ProductSellModule { }
