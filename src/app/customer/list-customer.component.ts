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
  customer: ICustomer = {
    id: null,
    date: null,
    custName: null,
    relation: null,
    relName: null,
    village: null,
    phone: null,
    ornaments: [null]
  };

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

  viewButtonClick(customerId: number){
    this.router.navigate(['home/view', customerId])
  }


  deleteButtonClick(customerId: number): void{
    this.customerService.deleteCustomer(customerId).subscribe(
      () => this.router.navigate(['home']),
      (err: any) => console.log(err)
    );
  }

}
