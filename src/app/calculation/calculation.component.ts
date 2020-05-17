import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {

  metalPrice: any = 0;
  goldPrice: any = 0;
  silverPrice: any = 0;
  weight: number = 0;
  metalPercent: number = 0;
  actualPrice: number = 0;
  collateralPrice: number = 0;
  restAmount: number = 0;
  value: any;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

    this.goldPrice = localStorage.getItem("goldPrice");
    this.silverPrice = localStorage.getItem("silverPrice");

  }
  onClickCalculation(gPrice){
    this.actualPrice = (this.metalPrice*this.weight*this.metalPercent)/1000;
    this.collateralPrice = (this.actualPrice*(0.7));
    this.restAmount = this.actualPrice - this.collateralPrice;
  }

  slideToggle(event){
    if ( event.checked == true ){
      this.metalPrice = this.goldPrice;
      this.actualPrice = 0;
      this.collateralPrice = 0;
      this.restAmount = 0;

    }
    else{
      this.metalPrice = this.silverPrice;
      this.actualPrice = 0;
      this.collateralPrice = 0;
      this.restAmount = 0;
    }
  }

}
