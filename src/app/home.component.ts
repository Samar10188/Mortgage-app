import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { stringify } from '@angular/core/src/render3/util';
import { CustomerService } from './customer/customer.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentDate = moment().format("DD-MM-YYYY");
  timeMessage: string;
  constructor(private customerService: CustomerService ) { 
    setInterval(() =>  {
      var currentTime = moment().format("hh.mm.ss");
      this.timeMessage = currentTime;    
    }
      , 1000);
     
  }
  ngOnInit() {

  }
  
}
