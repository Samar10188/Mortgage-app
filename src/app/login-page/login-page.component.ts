import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { authData } from '../Authdata';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  myData: authData = {
    username: null,
    password: null
  };
  constructor(private Auth: AuthService,
    private router: Router) { }

  ngOnInit() {
    this.Auth.getUserDetails().subscribe(data => {
      console.log("we got", data);
      this.myData = data;
      
    });
  }


  loginUser(event) {
    event.preventDefault()
    const target = event.target
    const username = target.elements[0].value;
    const password = target.elements[1].value;

    this.Auth.getUserDetails().subscribe(data => {
      this.myData = data;
      });

    if(username == this.myData[0].username && password == this.myData[0].password){
      this.router.navigate(['home/calculation'])
      this.Auth.setLoggedIn(true)
    }
    else{
      window.alert("Wrong Credentials")
    }
    console.log(username, password);
  }

}
