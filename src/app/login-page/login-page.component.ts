import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  userForm: FormGroup;
  loginId: string = "abc@y.com";
  passcode: string = "password";
  
  constructor(private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      userName: ['', [Validators.required ]],
      password: ['', [Validators.required ]]
    })
  }

  onSignIn(): void {
    if ((this.loginId = this.userForm.value.userName)
     &&
        (this.passcode = this.userForm.value.password ) 
        )
        {
          this.userForm.value.username.subscribe(
            () => this.router.navigate(['home'])
          );
    }
    else {
        alert("wrong credentials")
    }
  }

}
