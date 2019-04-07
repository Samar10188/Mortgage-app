import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../customer/ICustomer';
import { ReturnStatement } from '@angular/compiler';
import * as moment from 'moment';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  count: number;
  depositValue: number = 0;
  depositSum: number = 0;
  currentDate: any;
  depositDate: any;
  amount: number;
  remainAmount: number = 0;
  interestRate: any;
  totalDays:number = 0;
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
      this.depositDate = moment().format("YYYY-MM-DD").toString();
      
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
    this.depositCalculation(index);
    this.interestFormula(index);
  }
  // Date difference function
  dateDifference(index: number) {
    this.totalDays = this.currentDate.diff(this.customer.ornaments[index].subDate, 'days');
    console.log(this.totalDays);
    
  }

  // Interest calculation function
  interestFormula(index: number) {
    this.interest[index] = (this.amount*this.interestRate*this.totalDays)/(100*30);
    if (this.interest[index] > this.depositSum)
    { 
      this.interest[index] = this.interest[index] - this.depositSum
    }
    else
    { 
      this.remainAmount = (this.amount + this.interest[index]) - this.depositSum;
    }
  }

  depositCalculation(index: number) {
    for (let item of this.customer.ornaments[index].deposit){
      this.depositSum +=  parseInt(item.depositAmount.toString());
      // this.depositSum +=  item.depositAmount;
      console.log(this.depositSum);
   }
  }

  depositAmountButtonClick(index: number) {
    this.customer.ornaments[index].deposit.push({'depositAmount': this.depositValue,'depositDate': this.depositDate});
    // this.customer.ornaments[index].deposit[item+1]['depositAmount'] = this.depositValue;
    // this.customer.ornaments[index].deposit[item+1]['depositDate'] = this.depositDate;
    this.updateCustomer();
  }

  updateCustomer(){
    this.customerService.updateCustomer(this.customer).subscribe(
      () => this.router.navigate(['home/customers']),
      (err: any) => console.log(err)
    );
  }
}
