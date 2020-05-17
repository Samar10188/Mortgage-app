import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import * as bootstrap from "bootstrap";
import * as $ from "jquery";



import { AppComponent } from './app.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { FormBuilder } from '@angular/forms';
import { PageNotFoundComponent } from './page-not-found.component';
import { HeaderComponent } from './header.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import {AuthGuard} from './authentication/auth.guard';
import { CalculationComponent } from './calculation/calculation.component';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ListCustomerComponent } from './customer/list-customer.component';
import { CreateCustomerComponent } from './customer/create-customer.component';
import { SearchPipe } from './pipe/search/search.pipe';
import { SortPipe } from './pipe/sort/sort.pipe';
// import { SellProductComponent } from './product-sell/sell-product/sell-product.component';
// import { SoldListComponent } from './product-sell/sold-list/sold-list.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    PageNotFoundComponent,
    HeaderComponent,
    CustomerReportComponent,
    ListCustomerComponent,
    CreateCustomerComponent,
    CalculationComponent,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSlideToggleModule
  ],
  exports: [],
  providers: [FormBuilder, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {}
