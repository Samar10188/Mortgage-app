import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../customer/ICustomer';
import { ReturnStatement } from '@angular/compiler';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  principalAmount = [];
  amount: number;
  interestRate: number = 2;
  time:number = 2;
  interest: number;
  customer: ICustomer = {
    id: null,
    date: null,
    custName: null,
    relation: null,
    relName: null,
    village: null,
    phone: null,
    ornaments: []
  };

  
  constructor(private customerService: CustomerService,
              private route: ActivatedRoute,
              private router: Router) { }
  
  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const custId = +params.get('id');
      this.getCustomer(custId);
      });

    
      
  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      (cust: ICustomer) => {
        // this.viewCustomer(cust);
        this.customer = cust;
        this.viewCustomer(cust);
      },
      (err: any) => console.log(err)
    )
  }

  viewCustomer(customer: ICustomer) {
    return console.log(this.customer.ornaments)
    // this.custForm.patchValue({
    //   custName: customer.custName,
    //   relation: customer.relation,
    //   relative: customer.relName,
    //   village: customer.village,
    //   phone: customer.phone

    // });

    // this.custForm.setControl('ornaments', this.setExistingSkills(customer.ornaments));
  }

  interestCalculateButtonClick(index: number): number {
    this.interestCalculation(index);
    console.log('interest');
    return this.interest;
  }

  interestCalculation(index: number) {
    this.principalAmount[index] = this.customer.ornaments[index].rupees;
    this.amount = this.principalAmount[index];
    this.interest = (this.amount*this.interestRate*this.time)/100;
  }

}
