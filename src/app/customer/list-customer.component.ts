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

  // data: {email: "arpitkumarverma@gmail.com"};
  sortoption: string = "";
  searchTerm: string = "";
  value: any;
  customers: ICustomer[];
  customer: ICustomer = {
    _id: null,
    date: null,
    custName: null,
    relation: null,
    relative: null,
    village: null,
    phone: null,
    ornaments: [null]
  };

  constructor(private customerService: CustomerService,
              private router: Router) { }

              
  ngOnInit() {
    // this.customerService.getCustomers().subscribe(listCustomers => {
    //   this.customers = listCustomers;
    //   (err) => {
    //     return console.log(err);
    //   }    
    // })
      this.customerService.getCustomers().subscribe(data => {
        this.customers = data;
        console.log("we got", data);
      });
  }

  editButtonClick(customerId: number){
    console.log("Edit customer id",customerId);
    this.router.navigate(['home/edit', customerId])
  }

  viewButtonClick(customerId: number){
    this.router.navigate(['home/view', customerId])
  }


  deleteButtonClick(customerId){
    this.customerService.deleteCustomer(customerId).subscribe(
      (data)=> {
        if(data){this.value = data}
        else{
          console.log("no data")
        }
      // this.router.navigate(['home/calculation']),
      // (err: any) => console.log(err)
          });
          console.log("value is", this.value);
  }

}
