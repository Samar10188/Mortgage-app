import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerRoutingModule } from './customer/customer-routing.module';

import { LoginPageComponent } from './login-page/login-page.component';
import { PageNotFoundComponent } from './page-not-found.component';
import { HomeComponent } from './home.component';
import { ListCustomerComponent } from './customer/list-customer.component';
import { CreateCustomerComponent } from './customer/create-customer.component';
import { CustomerReportComponent } from './customer-report/customer-report.component';
import { AuthGuard } from './auth.guard';
import { CalculationComponent } from './calculation/calculation.component';

 
const routes: Routes = [
  { path: 'login', component: LoginPageComponent},
  // { path: 'home', component: HomeComponent , canActivate: [AuthGuard], children: [
    { path: 'home', component: HomeComponent , children: [
    { path: 'calculation', component: CalculationComponent},      
    { path: 'customers', component: ListCustomerComponent},
    { path: 'create', component: CreateCustomerComponent},
    { path: "edit/:id", component: CreateCustomerComponent },
    { path: "view/:id", component: CustomerReportComponent}
  ]},
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

