import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { authData } from './Authdata';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:3000/auth';

  private loggedInStatus = false
  httpClient: any;

  constructor(private http: HttpClient,
              private router: Router) { }

  setLoggedIn(value: boolean) {
    this.loggedInStatus = value
  }

  get isLoggedIn() {
    return this.loggedInStatus;
  }

  getUserDetails(data) {
    let url = 'http://localhost:3000/auth?username='+data.username +'&password='+data.password;
    return this.http.get(url)
    .pipe(catchError(this.handleError));
    
  }

  // let url = 'http://localhost:8080/adep/summary/formin/anlyze?mobile='+data.phone+'&pan='+data.pan+'&email='+data.email+'&formin='+data.formin;
  // getUserDetails() {
  //   let url = 'http://localhost:3000/customer?email=verma.samarpit@gmail.com';
  //   return this.http.get(url)
  // }
  
  private handleError(errorResponse: HttpErrorResponse) {
    if (errorResponse.error instanceof ErrorEvent) {
        console.error('Client Side Error :', errorResponse.error.message);
    } 
    else 
    {
        console.error('Server Side Error :', errorResponse);
    }
    return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
}


}