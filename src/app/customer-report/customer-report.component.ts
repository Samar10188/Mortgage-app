import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../customer/ICustomer';
import { ReturnStatement } from '@angular/compiler';
import * as moment from 'moment';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  currentDate: any;
  amount: number;
  interestRate: any;
  totalDays:number = 1;
  interest = [];
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

      this.currentDate = moment();
      
  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      (cust: ICustomer) => {
        this.customer = cust;
      },
      (err: any) => console.log(err)
    )
  }


  interestCalculateButtonClick(index: number) {
    this.amount = this.customer.ornaments[index].rupees;
    this.dateDifference(index);
    console.log(this.totalDays);
    this.interestFormula(index);
  }
  // Date difference function
  dateDifference(index: number) {
    this.totalDays = this.currentDate.diff(this.customer.ornaments[index].subDate, 'days');
  }

  // Interest calculation function
  interestFormula(index: number) {
    this.interest[index] = (this.amount*this.interestRate*this.totalDays)/(100*30);
  }

}
