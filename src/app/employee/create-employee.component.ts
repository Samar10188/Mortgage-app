import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validator, Validators, AbstractControl, FormArray, FormControl } from '@angular/forms'
import { CustomValidators } from '../shared/custom.validators';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './employee.service';
import { IEmployee } from './IEmployee';
import { ISkill } from './ISkill';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {

  employeeForm: FormGroup;
  fullNameLength: number = 0;
  pageTitle: string;

  formErrors = {
    // 'fullName': '',
    // 'email': '',
    // 'emailGroup': '',
    // 'confirmEmail': '',
    // 'phone': '',
    // 'skillName': '',
    // 'experienceInYears': '',
    // 'proficiency': ''
  };

  // This object contains all the validation messages for this form
  validationMessages = {
    'fullName': {
      'required': 'Full Name is required.',
      'minlength': 'Full Name must be greater than 2 characters.',
      'maxlength': 'Full Name must be less than 10 characters.'
    },
    'email': {
      'required': 'Email is required.',
      'emailDomain': 'Email should be dell.com'
    },
    'confirmEmail': {
      'required': 'Confirm Email is required.',
      'emailDomain': 'Email should be dell.com'
    },
    'emailGroup': {
      'emailMismatch': 'Email and Confirm Email donot match.'
    },
    'phone': {
      'required': 'Phone is required.'
    }
  };
  employee: IEmployee;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private employeeService: EmployeeService,
    private router: Router) { }

  ngOnInit() {
    this.employeeForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(10)]],
      contactPreference: ['email'],
      emailGroup: this.fb.group({
        email: ['', [Validators.required, CustomValidators.emailDomain('dell.com')]],
        confirmEmail: ['', [Validators.required]]
      }, {
          validators: matchEmail
        }),
      phone: [''],
      skills: this.fb.array([
        this.addSkillFormGroup()
      ])
    });

    // this.employeeForm = new FormGroup({
    //   fullName: new FormControl(),
    //   email: new FormControl(),
    //   // Create skills form group as nested group
    //   skills: new FormGroup({
    //     skillName: new FormControl(),
    //     experienceInYears: new FormControl(),
    //     proficiency: new FormControl()
    //   })
    // });
    this.employeeForm.get('contactPreference').valueChanges.subscribe((data: string) => {
      this.onContactPreferenceChange(data);

      this.employeeForm.valueChanges.subscribe((data) => {
        this.logValidationErrors(this.employeeForm);
      });
      //    this.employeeForm.get('skills').valueChanges.subscribe((value: any) => {
      //       console.log(JSON.stringify(value));

    });

    this.route.paramMap.subscribe(params => {
      const empId = +params.get('id');
      if (empId) {
        this.getEmployee(empId);
        this.pageTitle = "Edit Employee";
      }
      else {
        this.pageTitle = "Create Employee";
        this.employee = {
          "id": null,
          "fullName": "",
          "contactPreference": "",
          "email": "",
          "confirmEmail": "",
          "phone": null,
          "skills": []
        }
      }
    });

  }

  getEmployee(id: number) {
    this.employeeService.getEmployee(id).subscribe(
      (emp: IEmployee) => {
        this.editEmployee(emp);
        this.employee = emp;
      },
      (err: any) => console.log(err)
    )
  }
  editEmployee(employee: IEmployee) {
    this.employeeForm.patchValue({
      fullName: employee.fullName,
      contactPreference: employee.contactPreference,
      emailGroup: {
        email: employee.email,
        confirmEmail: employee.email
      },
      phone: employee.phone
    });

    this.employeeForm.setControl('skills', this.setExistingSkills(employee.skills))

  }

  setExistingSkills(skillSets: ISkill[]): FormArray {
    const formArray = new FormArray([]);
    skillSets.forEach(s => {
      formArray.push(this.fb.group({
        skillName: s.skillName,
        experienceInYears: s.experienceInYears,
        proficiency: s.proficiency
      }));
    })
    return formArray;
  }

  addSkillButtonClick(): void {
    (<FormArray>this.employeeForm.get('skills')).push(this.addSkillFormGroup());
  }

  removeSkillButtonClick(skillGroupIndex: number): void {
    const skillsFormArray = <FormArray>this.employeeForm.get('skills');
    skillsFormArray.removeAt(skillGroupIndex);
    skillsFormArray.markAsTouched();
    skillsFormArray.markAsDirty();
  }

  addSkillFormGroup(): FormGroup {
    return this.fb.group({
      skillName: ['', [Validators.required]],
      experienceInYears: ['', [Validators.required]],
      proficiency: ['', [Validators.required]]
    })
  }

  onContactPreferenceChange(selectedValue: string) {
    const phoneControl = this.employeeForm.get('phone');
    if (selectedValue === 'phone') {
      phoneControl.setValidators(Validators.required);
    } else {
      phoneControl.clearValidators();
    }
    phoneControl.updateValueAndValidity();
  }

  logValidationErrors(group: FormGroup = this.employeeForm): void {
    Object.keys(group.controls).forEach((key: string) => {
      const AbstractControl = group.get(key);

      this.formErrors[key] = '';
      if (AbstractControl && !AbstractControl.valid &&
        AbstractControl.touched || AbstractControl.dirty || AbstractControl.value !== '') {
        const messages = this.validationMessages[key];

        for (const errorKey in AbstractControl.errors) {
          if (errorKey) {
            this.formErrors[key] += messages[errorKey] + ' ';

            // if (AbstractControl instanceof FormArray) {
            //   for (const control of AbstractControl.controls)
            //     if (control instanceof FormGroup) {
            //       this.logValidationErrors(control);
            //     }
            // }
            if (AbstractControl instanceof FormGroup) {
              this.logValidationErrors(AbstractControl);
            }
          }
        }
      }

      // logKeyValuePairs(group: FormGroup): void {
      //   Object.keys(group.controls).forEach((key: string ) => {
      //     const AbstractControl = group.get(key)
      //     if (AbstractControl instanceof FormGroup) {
      //       this.logKeyValuePairs(AbstractControl);
      //     } else
      //     {
      //   // console.log('key =' + key + 'value =' + AbstractControl.value)
      //       AbstractControl.markAsDirty(); 
      //   }

    });
  }

  onLoadDataClick(): void {
    const formArray1 = this.fb.array([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),

    ]);

    const formGroup1 = this.fb.group([
      new FormControl('John', Validators.required),
      new FormControl('IT', Validators.required),
      new FormControl('', Validators.required),

    ]);
    console.log(formArray1);
    console.log(formGroup1);

    // const formArray = new FormArray([
    //   new FormControl('John', Validators.required),
    //   new FormGroup({
    //     country: new FormControl('', Validators.required)
    //   }),
    //   new FormArray([])
    // ]);

    //formArray1.push(new FormControl('Tim',Validators.required));

    // for (const control of formArray.controls){
    //   if (control instanceof FormControl){
    //     console.log('Control is FormControl')
    //   }
    //   if (control instanceof FormGroup){
    //     console.log('Control is FormGroup')
    //   }
    //   if (control instanceof FormArray){
    //     console.log('Control is FormArray')
    //   }
    // }
    //this.logValidationErrors(this.employeeForm);
    // this.employeeForm.setValue({
    //   fullName: 'Samarpit Verma',
    //   email: 'samar@123.com',
    //   skills: {
    //     skillName: 'C#',
    //     experienceInYears: '5',
    //     proficiency: 'beginner'
    //   }
    // })
  }


  onSubmit(): void {
    this.mapFormValuesToEmployeeModel();
    if (this.employee.id) {
      this.employeeService.updateEmployee(this.employee).subscribe(
        () => this.router.navigate(['employees']),
        (err: any) => console.log(err)
      );
    }
    else {
      this.employeeService.addEmployee(this.employee).subscribe(
        () => this.router.navigate(['list']),
        (err: any) => console.log(err)
      );
    }
  }

  mapFormValuesToEmployeeModel() {
    this.employee.fullName = this.employeeForm.value.fullName;
    this.employee.contactPreference = this.employeeForm.value.contactPreference;
    this.employee.email = this.employeeForm.value.emailGroup.email;
    this.employee.phone = this.employeeForm.value.phone;
    this.employee.skills = this.employeeForm.value.skills;

  }

}

function matchEmail(group: AbstractControl): { [key: string]: any } | null {
  const emailControl = group.get('email');
  const confirmEmailControl = group.get('confirmEmail');

  if (emailControl.value === confirmEmailControl.value 
    || (confirmEmailControl.pristine && confirmEmailControl.value === '')) {
    return null;
  } else {
    return { 'emailMismatch': true }
  }
}