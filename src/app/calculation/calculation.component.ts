import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-calculation',
  templateUrl: './calculation.component.html',
  styleUrls: ['./calculation.component.css']
})
export class CalculationComponent implements OnInit {


  goldPrice: number = 0;
  weight: number = 0;
  metalPercent: number = 0;
  actualPrice: number = 0;
  collateralPrice: number = 0;
  restAmount: number = 0;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {

  }
  onClickCalculation(){
    this.actualPrice = (this.goldPrice*this.weight*this.metalPercent)/1000;
    this.collateralPrice = (this.goldPrice*this.weight*(0.6))/10;
    this.restAmount = this.actualPrice - this.collateralPrice;
  }

}
