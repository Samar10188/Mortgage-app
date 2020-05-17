import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  
  $: any;
  goldPrice: number = 0;
  silverPrice: number = 0;
  currentDate = moment().format("DD-MM-YYYY");
  timeMessage: string;
  constructor(private router : Router ) { 
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
    this.router.navigate(['home/customers'])
  }
}
