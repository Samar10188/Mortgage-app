import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-sell-product',
  templateUrl: './sell-product.component.html',
  styleUrls: ['./sell-product.component.css']
})
export class SellProductComponent implements OnInit {

  customerForm: FormGroup;
  pageTitle: String = "Enter Customer Details";

  constructor(private fb: FormBuilder,
              private router: Router
  ) { }

  ngOnInit() {
    this.customerForm = this.fb.group({
      date: ['01/01/2019'],
      custName: [''],
      relation: ['S/O'],
      relative: [''],
      district: [''],
      village: [''],
      phone: [''],
      ornaments: this.fb.array([
        this.addOrnamentsFormGroup()
      ])

    });

  }

  addOrnamentsFormGroup(): FormGroup {
    return this.fb.group({
      ornament: [''],
      metal: [''],
      weight: [''],
      rupees: [''],
      priceOfMetal: [''],
      deposit: [[]]
    });
  }

}
