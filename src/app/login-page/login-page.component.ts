import { Component, OnInit } from '@angular/core';
import { AuthService } from '../authentication/auth.service';
import { Router } from '@angular/router';
import { authData } from '../authentication/Authdata';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  username: any = null;
  password: any = null;
  myData: authData = {
    username: null,
    password: null
  };
  authenticate: any = null;
  headerProperty: string;
  // myData: any;
  constructor(private Auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    // this.Auth.getUserDetails(this.myData).subscribe(data => {
    //   console.log("we got", data);
    //   this.authenticate = data;
      
    // });
  }


  loginUser() {
    console.log("username", this.myData.username)
    console.log("password", this.myData.password)
    this.Auth.getUserDetails(this.myData).subscribe(data => {
      console.log("value of authenticate", data);
      // this.authenticate = data;
      if(data == true){
        this.router.navigate(['home/calculation']);
        this.Auth.setLoggedIn(true);
      }
      else{
        window.alert("Wrong Credentials");
      }
      // this.authenticateUser()
      });
      // this.Auth.getUserDetails(this.myData).subscribe((res: any) =>{
      //   this.headerProperty = res.headers.get('property name here');
      //   // if(res){
      //     console.log("header ", res.headers);
      //     console.log("header property", this.headerProperty);
      //   // }
      // })

    // if(this.authenticate == true){
    //   this.router.navigate(['home/calculation'])
    //   // this.Auth.setLoggedIn(true)
    // }
    // else{
    //   window.alert("Wrong Credentials")
    // }
    // console.log(username, password);
  }

  // authenticateUser(){
    // if(this.authenticate == true){
    //   this.router.navigate(['home/calculation']);
    //   this.Auth.setLoggedIn(true);
    // }
    // else{
    //   window.alert("Wrong Credentials");
    // }
  // }

}
