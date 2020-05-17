import { Component, OnInit, Input } from '@angular/core';
import { CustomerService } from '../customer/customer.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../customer/ICustomer';
import * as moment from 'moment';


@Component({
  selector: 'app-customer-report',
  templateUrl: './customer-report.component.html',
  styleUrls: ['./customer-report.component.css']
})
export class CustomerReportComponent implements OnInit {

  @Input() gPrice: number;
  @Input() sPrice: number;

  deposit_array: [{}];
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
  prevInterest: number = 0;
  interestRate: any;
  totalDays: number = 0;
  interest = [];
  customer: ICustomer = {
    _id: null,
    date: null,
    custName: null,
    relation: null,
    relative: null,
    village: null,
    phone: null,
    ornaments: []
  };
  prevDate: Date;
  nextDate: any;
  firstDate: any;



  constructor(private customerService: CustomerService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      const custId = params.get('_id');
      this.getCustomer(custId);
    });

    this.currentDate = moment();
    this.depositDate = moment().format("YYYY-MM-DD").toString();

  }

  getCustomer(_id) {
    this.customerService.getCustomer(_id).subscribe(
      (cust: ICustomer) => {
        this.customer = cust;
        console.log("view customer", cust)
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
    this.initializeValues(index);
    this.arrayObjectCount(index);

    console.log(this.count + "is count");

    if (this.count <= 1) {
      switch (this.count) {
        case 0:
          this.amount = this.customer.ornaments[index].rupees;
          this.firstDate = moment(this.currentDate, "YYYY-MM-DD");
          // console.log("deposit date", this.depositDate);
          this.totalDays = this.firstDate.diff(this.customer.ornaments[index].subDate, 'days');
          // this.totalDays = moment("2019-05-15").diff(this.customer.ornaments[index].subDate, 'days');
          console.log(this.totalDays + "=days");
          break;
        case 1:
          this.amount = this.customer.ornaments[index].deposit[this.count - 1].actualAmount;
          this.nextDate = moment(this.currentDate, "YYYY-MM-DD");
          this.prevDate = this.customer.ornaments[index].deposit[0].depositDate;
          this.totalDays = this.nextDate.diff(this.prevDate, 'days');
          console.log(this.totalDays + "=days");
          break;
      }
    }
    else {
      this.amount = this.customer.ornaments[index].deposit[this.count - 1].actualAmount;
      this.nextDate = moment(this.currentDate, "YYYY-MM-DD")
      this.totalDays = this.nextDate.diff(this.customer.ornaments[index].deposit[this.count - 1].depositDate, 'days');
      console.log(this.totalDays + "=days");
    }

    this.interestFormula(index);
    this.remainInterestCalculation(index);
    this.depositValue = 0;
    this.amountAnalysis(index);
  }

  depositInterestCalculate(index: number) {
    this.initializeValues(index);
    this.arrayObjectCount(index);

    console.log(this.count + "is count");

    if (this.count <= 1) {
      switch (this.count) {
        case 0:
          this.amount = this.customer.ornaments[index].rupees;
          this.firstDate = moment(this.depositDate, "YYYY-MM-DD");
          console.log("deposit date", this.depositDate);
          this.totalDays = this.firstDate.diff(this.customer.ornaments[index].subDate, 'days');
          // this.totalDays = moment("2019-05-15").diff(this.customer.ornaments[index].subDate, 'days');
          console.log(this.totalDays + "=days");
          break;
        case 1:
          this.amount = this.customer.ornaments[index].deposit[this.count - 1].actualAmount;
          this.nextDate = moment(this.depositDate, "YYYY-MM-DD");
          this.prevDate = this.customer.ornaments[index].deposit[0].depositDate;
          this.totalDays = this.nextDate.diff(this.prevDate, 'days');
          console.log(this.totalDays + "=days");
          break;
      }
    }
    else {
      this.amount = this.customer.ornaments[index].deposit[this.count - 1].actualAmount;
      this.nextDate = moment(this.depositDate, "YYYY-MM-DD")
      this.totalDays = this.nextDate.diff(this.customer.ornaments[index].deposit[this.count - 1].depositDate, 'days');
      console.log(this.totalDays + "=days");
    }

    this.interestFormula(index);
    this.remainInterestCalculation(index);
    this.amountAnalysis(index);
  }

  initializeValues(index: number) {
    this.actualValue = 0;
    this.totalAmount = 0;
    this.interest[index] = 0;
    this.count = 0;
    this.remainInterest = 0;
    this.prevInterest = 0;
  }

  // Interest calculation function
  interestFormula(index: number) {
    var interestLeft = this.customer.ornaments[index].deposit[this.count - 1].remainInterest
    if(interestLeft > 0){
      this.amount = this.customer.ornaments[index].deposit[this.count - 1].totalAmount
      this.interest[index] = (this.amount * this.interestRate * this.totalDays) / (100 * 30);
    }
    else{
      this.interest[index] = (this.amount * this.interestRate * this.totalDays) / (100 * 30);
    }
  }

  // Counter for deposit Array
  arrayObjectCount(index: number) {
    var deposit = this.customer.ornaments[index].deposit;
    // if (deposit) {
      for (let item of deposit) {
        console.log("item is", item);
        this.count += 1;
      }
    // }
    // else {
    //   this.count = 0;
    // }
    // this.deposit_array = this.customer.ornaments[index].deposit
    // this.count = this.deposit_array.length;
  }

  depositAmountButtonClick(index: number) {
    this.depositInterestCalculate(index);
    console.log('depositDate', this.depositDate);
    console.log('depositAmount', this.depositValue);
    console.log('actualAmount', this.actualValue);
    console.log('interest', this.interest[index]);
    console.log('remainInterest', this.remainInterest);
    console.log('totalAmount', this.totalAmount);
    this.customer.ornaments[index].deposit.push({
      'depositDate': this.depositDate,
      'depositAmount': this.depositValue, 'actualAmount': this.actualValue,
      'interest': this.interest[index], 'remainInterest': this.remainInterest,
      'totalAmount': this.totalAmount
    });
    // this.customer.ornaments[index].deposit[item+1]['depositAmount'] = this.depositValue;
    // this.customer.ornaments[index].deposit[item+1]['depositDate'] = this.depositDate;
    this.updateCustomer();
  }


  amountAnalysis(index: number) {
    if (this.interest[index] > this.depositValue) {
      this.actualValue = this.amount;
      this.remainInterest = this.interest[index] - this.depositValue;
      this.totalAmount = this.actualValue + this.remainInterest;
    }
    else {
      this.actualValue = (this.amount + this.interest[index]) - this.depositValue;
      if (this.actualValue < 0) {
        this.actualValue = 0
      }
      else {
        this.actualValue = (this.amount + this.interest[index]) - this.depositValue;
      }
      this.remainInterest = 0;
      this.totalAmount = this.actualValue;
    }
  }

  // Calculation for total remaining Interest
  remainInterestCalculation(index: number) {
    // var deposit = this.customer.ornaments[index].deposit;
    // if(deposit){
      for (let item of this.customer.ornaments[index].deposit) {
        this.prevInterest += item.remainInterest;
        console.log(this.prevInterest + "is previous interest");
      }
    // }
    // else{
    //   this.prevInterest = 0;
    // }
  }

}
