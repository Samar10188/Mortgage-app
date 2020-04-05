import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { CustomerService } from './customer/customer.service';
import { MetalPriceService } from './metal-price.service';
import { Router } from '@angular/router';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  
  $: any;
  goldPrice: number = 0;
  silverPrice: number = 0;
  currentDate = moment().format("DD-MM-YYYY");
  timeMessage: string;
  constructor(private metalPriceService : MetalPriceService,
              private router : Router ) { 
    setInterval(() =>  {
      var currentTime = moment().format("hh.mm.ss");
      this.timeMessage = currentTime;    
    }
      , 1000);

  }
  ngOnInit() {

    $(document).ready(function(){
      ($('#myModal')).modal("show");
    });

  }
  
  onClickPriceSubmit(gPrice, sPrice){
    localStorage.setItem("goldPrice", gPrice);
    localStorage.setItem("silverPrice", sPrice);
    // sessionStorage.setItem("goldPrice", gPrice);
    // sessionStorage.setItem("silverPrice", sPrice);
    this.goldPrice = gPrice;
    this.silverPrice = sPrice;
    this.metalPriceService.sendGoldPrice(this.goldPrice);
    this.metalPriceService.sendSilverPrice(this.silverPrice);
    this.router.navigate(['home/customers'])
  }
}
