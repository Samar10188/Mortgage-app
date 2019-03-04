import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray, } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICustomer } from './ICustomer';

import { getLocaleDateFormat } from '@angular/common';
import { IOrnament } from './IOrnament';

@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  custForm: FormGroup;
  pageTitle: string;
  curDate: string;
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


  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.custForm = this.fb.group({
      date: [3 / 4 / 2019],
      custName: [''],
      relation: ['', [Validators.required]],
      relName: ['', [Validators.required]],
      village: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ornaments: this.fb.array([
        this.addOrnamentsFormGroup
      ])
    })

    // this.customer

    // this.route.paramMap.subscribe(params => {
    //   const custId = +params.get('id');
    //     this.getCustomer(custId);
    //     this.pageTitle = "Edit Employee";
    // });
    this.route.paramMap.subscribe(params => {
      const custId = +params.get('id');
      if (custId) {
        this.getCustomer(custId);
        this.pageTitle = "Edit Customer";
      }
      else {
        this.pageTitle = "Create Customer";
        this.customer = {
          "id": null,
          "date": "",
          "custName": "",
          "relation": "",
          "relName": "",
          "village": "",
          "phone": null,
          "ornaments": []
        }
      }
    });

  }

  getCustomer(id: number) {
    this.customerService.getCustomer(id).subscribe(
      (cust: ICustomer) => {
        this.editCustomer(cust);
        this.customer = cust;
      },
      (err: any) => console.log(err)
    )
  }

  editCustomer(customer: ICustomer) {
    this.custForm.patchValue({
      custName: customer.custName,
      relation: customer.relation,
      relative: customer.relName,
      village: customer.village,
      phone: customer.phone

    });

    this.custForm.setControl('ornaments', this.setExistingSkills(customer.ornaments));
  }

  setExistingSkills(ornamentSets: IOrnament[]): FormArray {
    const formArray = new FormArray([]);
    ornamentSets.forEach(s => {
      formArray.push(this.fb.group({
        ornament: s.ornament,
        metal: s.metal,
        weight: s.weight,
        rupees: s.rupees
      }));
    })
    return formArray;
  }

  addOrnamentButtonClick(): void {
    (<FormArray>this.custForm.get('ornaments')).push(this.addOrnamentsFormGroup());
  }

  removeOrnamentButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.custForm.get('ornaments');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsTouched();
    skillsFormArray.markAsDirty();
  }

  addOrnamentsFormGroup(): FormGroup {
    return this.fb.group({
      ornament: ['', [Validators.required]],
      metal: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      rupees: ['', [Validators.required]]
    })
  }

    // logValidationErrors(group: FormGroup = this.custForm): void {
    //   Object.keys(group.controls).forEach((key: string) => {
    //     const AbstractControl = group.get(key);

    //     this.formErrors[key] = '';
    //     if (AbstractControl && !AbstractControl.valid &&
    //       AbstractControl.touched || AbstractControl.dirty || AbstractControl.value !== '') {
    //       const messages = this.validationMessages[key];

    //       for (const errorKey in AbstractControl.errors) {
    //         if (errorKey) {
    //           this.formErrors[key] += messages[errorKey] + ' ';

    onSubmit(): void {
      this.mapFormValuesTocustomerModel();
      if (this.customer.id) {
        this.customerService.updateCustomer(this.customer).subscribe(
          () => this.router.navigate(['customers']),
          (err: any) => console.log(err)
        );
      }
      else {
      this.customerService.addCustomer(this.customer).subscribe(
        () => this.router.navigate(['home/customers']),
        (err: any) => console.log(err)
      );
    }
  }

    mapFormValuesTocustomerModel() {
      this.customer.date = this.custForm.value.date;
      this.customer.custName = this.custForm.value.custName;
      this.customer.relation = this.custForm.value.relation;
      this.customer.relName = this.custForm.value.relName;
      this.customer.village = this.custForm.value.village;
      this.customer.phone = this.custForm.value.phone;
      this.customer.ornaments = this.custForm.value.ornaments;

    }
  }
