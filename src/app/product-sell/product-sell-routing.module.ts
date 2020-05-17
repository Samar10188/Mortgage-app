import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SellProductComponent } from './sell-product/sell-product.component';
import { SoldListComponent } from './sold-list/sold-list.component';

const routes: Routes = [
  {"path": "", children: [
    {"path": "create", component: SellProductComponent},
    {"path": "list", component: SoldListComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductSellRoutingModule { }
