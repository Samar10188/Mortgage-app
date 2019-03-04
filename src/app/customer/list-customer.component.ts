import { Component, OnInit } from '@angular/core';
import { ICustomer } from './ICustomer';
import { CustomerService } from './customer.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-customer',
  templateUrl: './list-customer.component.html',
  styleUrls: ['./list-customer.component.css']
})
export class ListCustomerComponent implements OnInit {

  customers: ICustomer[];

  constructor(private customerService: CustomerService,
              private router: Router) { }
            
  ngOnInit() {
    this.customerService.getCustomers().subscribe(
      (listCustomers) => this.customers = listCustomers,
      (err) => console.log(err)    
      )
  }

  editButtonClick(customerId: number){
    this.router.navigate(['home/edit', customerId])
  }
}
