import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {
  custForm: FormGroup;

  constructor(private fb: FormBuilder,
              private customerservice: CustomerService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.custForm = this.fb.group({
      date: [''],
      custName: ['',[Validators.required]],
      relation: ['',[Validators.required]],
      relName: ['',[Validators.required]],
      village: ['',[Validators.required]],
      phone: ['',[Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      Ornament: ['',[Validators.required]],
      Metal: ['',[Validators.required]],
      weight: ['',[Validators.required]],
      Rupees: ['',[Validators.required]],
      timeDuration: [''], 
      intrest: ['']
    })
  }

}
