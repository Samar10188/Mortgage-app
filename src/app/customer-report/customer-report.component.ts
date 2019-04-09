import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../customer/ICustomer';
import { ReturnStatement } from '@angular/compiler';
import * as moment from 'moment';
import { indexDebugNode } from '@angular/core/src/debug/debug_node';
import { DecimalPipe } from '@angular/common';
import { CONTAINER_INDEX } from '@angular/core/src/render3/interfaces/view';

@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  count: number = 0;
  depositValue: number = 0;
  totalAmount: number = 0;
  remainAmount: number = 0;
  depositSum: number = 0;
  currentDate: any;
  depositDate: any;
  amount: number = 0;
  actualValue: number = 0;
  remainInterest: number = 0;
  interestRate: any;
  totalDays: number = 0;
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
  prevDate: Date;
  nextDate: any;



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
    // this.prevDate = 

  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      (cust: ICustomer) => {
        this.customer = cust;
      },
      (err: any) => console.log(err)
    )
  }

  updateCustomer() {
    this.customerService.updateCustomer(this.customer).subscribe(
      () => this.router.navigate(['home/customers']),
      (err: any) => console.log(err)
    );
  }

  interestCalculateButtonClick(index: number) {
    // this.amount = this.customer.ornaments[index].deposit[item].actualAmount;
    this.arrayObjectCount(index);

    console.log(this.count+ "one");

    if (this.count <=1) {
    switch (this.count) {
      case 0:
      this.amount = this.customer.ornaments[index].rupees;
      // this.totalDays = this.currentDate.diff(this.customer.ornaments[index].subDate, 'days');
      this.totalDays = moment("2018-06-30").diff(this.customer.ornaments[index].subDate, 'days');
      console.log(this.totalDays);
        break;
      case 1:
      this.amount = this.customer.ornaments[index].deposit[this.count-1].actualAmount;
      this.nextDate = moment(this.depositDate, "YYYY-MM-DD");
      this.prevDate = this.customer.ornaments[index].deposit[0].depositDate;
      this.totalDays = this.nextDate.diff(this.prevDate, 'days');
      console.log(this.totalDays);
        break;
      }
    }
    else{
      this.amount = this.customer.ornaments[index].deposit[this.count - 1].actualAmount;
      this.nextDate = moment(this.depositDate, "YYYY-MM-DD")
      this.totalDays = this.nextDate.diff(this.customer.ornaments[index].deposit[this.count-1].depositDate, 'days');
      console.log(this.totalDays);
  }

    console.log(this.count+"last");
    this.interestFormula(index);
    this.amountAnalysis(index);
  }


  // Interest calculation function
  interestFormula(index: number) {
    this.interest[index] = (this.amount * this.interestRate * this.totalDays) / (100 * 30);
  }

  arrayObjectCount(index: number) {
    for (let item of this.customer.ornaments[index].deposit) {
      this.count += 1;
    }
  }

  depositAmountButtonClick(index: number) {
    this.interestCalculateButtonClick(index);
    this.customer.ornaments[index].deposit.push({ 'depositDate': this.depositDate,
      'depositAmount': this.depositValue, 'actualAmount': this.actualValue, 
      'interest': this.interest[index], 'remainInterest': this.remainInterest,
      'totalAmount':this.totalAmount });
    // this.customer.ornaments[index].deposit[item+1]['depositAmount'] = this.depositValue;
    // this.customer.ornaments[index].deposit[item+1]['depositDate'] = this.depositDate;
    this.updateCustomer();
  }


  amountAnalysis(index: number){
    if (this.interest[index] > this.depositValue) {
      this.actualValue = this.amount;
      this.remainInterest = this.interest[index] - this.depositValue;
      this.totalAmount = this.actualValue + this.remainInterest;
    }
    else {
      this.actualValue = (this.amount + this.interest[index]) - this.depositValue;
      this.remainInterest = 0;
      this.totalAmount = this.actualValue;
    }
  }

}
