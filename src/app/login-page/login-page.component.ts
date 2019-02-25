import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl, FormControl } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';
import { IAdmin } from "./login-details";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userForm: FormGroup;
  // loginId: string = "abc@y.com";
  // passcode: string = "password";
  login: IAdmin;

  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  onSignIn(): void {
    if ((this.userForm.value.userName = "abc@y.com")
      &&
      (this.userForm.value.password = "samar123")) {
      this.router.navigate(['home']);
    }
    else {
      alert("wrong credentials")
    }
  }

  // mapFormValuesToEmployeeModel() {
  //   this.login.userName = this.userForm.value.userName;
  //   this.login.password = this.userForm.value.password;

  // }
}
