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

  getUserDetails() {
    return this.http.get<authData>(this.baseUrl)
  }


}