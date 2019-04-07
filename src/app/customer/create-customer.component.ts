import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl, FormArray, } from '@angular/forms';
import { CustomerService } from './customer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ICustomer } from './ICustomer';
import { IOrnament } from './IOrnament';
import * as moment from 'moment';
import { format } from 'url';



@Component({
  selector: 'app-create-customer',
  templateUrl: './create-customer.component.html',
  styleUrls: ['./create-customer.component.css']
})
export class CreateCustomerComponent implements OnInit {

  custForm: FormGroup;
  pageTitle: string;
  curDate: string;
  today = new Date();
  currentDate: any;
  customer: ICustomer = {
    id: null,
    date: null,
    custName: null,
    relation: null,
    relName: null,
    village: null,
    phone: null,
    ornaments: [null]
  };

  formErrors = {
    'date': '',
    'custName': '',
    'relation': '',
    'relName': '',
    'village': '',
    'phone': ''
  };

    // This object contains all the validation messages for this form
    validationMessages = {
      'date': {
        'required': 'date is required.'
      },
      'custName': {
        'required': 'Customer Name is required.'
      },
      'relation': {
        'required': 'Relation is required.'
      },
      'relName': {
        'required': 'Relative Name is required.'
      },
      'village': {
        'required': 'Village name is required.'
      },
      'phone': {
        'required': 'Phone number is required.'
      }
    };

  constructor(private fb: FormBuilder,
    private customerService: CustomerService,
    private router: Router,
    private route: ActivatedRoute) { }

    
  ngOnInit() {
    this.custForm = this.fb.group({
      date: [this.currentDate],
      custName: ['', [Validators.required]],
      relation: ['', [Validators.required]],
      relName: ['', [Validators.required]],
      village: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      ornaments: this.fb.array([
        this.addOrnamentsFormGroup()
      ])
    });

    // this.custForm.valueChanges.subscribe((data) => {
    //   this.logValidationErrors(this.custForm);
    // });

  
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
        this.currentDate = moment().format('dd MM YYYY');
        this.pageTitle = "Create Customer";
        this.customer = {
          "id": null,
          "date": "" ,
          "custName": "",
          "relation": "",
          "relName": "",
          "village": "",
          "phone": null,
          "ornaments": []
        }
      }
    });

    this.currentDate = moment().format('DD/MM/YYYY')
  }

  addOrnamentButtonClick(): void {
    (<FormArray>this.custForm.get('ornaments')).push(this.addOrnamentsFormGroup());
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
      date: customer.date,
      custName: customer.custName,
      relation: customer.relation,
      relName: customer.relName,
      village: customer.village,
      phone: customer.phone

    });

    this.custForm.setControl('ornaments', this.setExistingSkills(customer.ornaments));
  }

  setExistingSkills(ornamentSets: IOrnament[]): FormArray {
    const formArray = new FormArray([]);
    ornamentSets.forEach(s => {
      formArray.push(this.fb.group({
        subDate: s.subDate,
        ornament: s.ornament,
        metal: s.metal,
        weight: s.weight,
        rupees: s.rupees,
      }));
    })
    return formArray;
  }


  removeOrnamentButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.custForm.get('ornaments');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsTouched();
    skillsFormArray.markAsDirty();
  }

  addOrnamentsFormGroup(): FormGroup {
    return this.fb.group({
      subDate: [''],
      ornament: ['', [Validators.required]],
      metal: ['', [Validators.required]],
      weight: ['', [Validators.required]],
      rupees: ['', [Validators.required]],
      deposit: [[]]
    });
  }


  get ornamentsArray() {
    return <FormArray>this.custForm.get('ornaments');
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

  //           if (AbstractControl instanceof FormGroup) {
  //             this.logValidationErrors(AbstractControl);
  //           }
  //         }
  //       }
  //     }
  //   });
  // }


    onSubmit(): void {
      this.mapFormValuesTocustomerModel();
      if (this.customer.id) {
        this.customerService.updateCustomer(this.customer).subscribe(
          () => this.router.navigate(['home/customers']),
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
