import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentDate = moment().format("DD-MM-YYYY");
  timeMessage: string;
  constructor() { 
    setInterval(() =>  {
      var currentTime = moment().format("hh.mm.ss");
      this.timeMessage = currentTime;    
    }
      , 1000);
     
  }

  ngOnInit() {
  }

}
