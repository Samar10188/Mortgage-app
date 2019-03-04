import { Injectable } from '@angular/core';
import { ICustomer } from "./ICustomer";
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  baseUrl = 'http://localhost:3000/customers';
  
  constructor(private httpClient: HttpClient) {
  }
 
  getCustomers(): Observable<ICustomer[]> {
      return this.httpClient.get<ICustomer[]>(this.baseUrl)
          .pipe(catchError(this.handleError));
  }

  private handleError(errorResponse: HttpErrorResponse) {
      if (errorResponse.error instanceof ErrorEvent) {
          console.error('Client Side Error :', errorResponse.error.message);
      } else {
          console.error('Server Side Error :', errorResponse);
      }
      return throwError('There is a problem with the service. We are notified & working on it. Please try again later.');
  }

  getCustomer(id: number): Observable<ICustomer> {
      return this.httpClient.get<ICustomer>(`${this.baseUrl}/${id}`)
          .pipe(catchError(this.handleError));
  }

  addCustomer(customer: ICustomer): Observable<ICustomer> {
      return this.httpClient.post<ICustomer>(this.baseUrl, customer, {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      })
      .pipe(catchError(this.handleError));
  }

  updateCustomer(customer: ICustomer): Observable<void> {
      return this.httpClient.put<void>(`${this.baseUrl}/${customer.id}`, customer, {
          headers: new HttpHeaders({
              'Content-Type': 'application/json'
          })
      })
          .pipe(catchError(this.handleError));
  }

  deleteCustomer(id: number): Observable<void> {
      return this.httpClient.delete<void>(`${this.baseUrl}/${id}`)
          .pipe(catchError(this.handleError));
  }
}
