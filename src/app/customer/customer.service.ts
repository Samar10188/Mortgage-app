import { Injectable } from '@angular/core';
import { ICustomer } from "./ICustomer";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpRequest } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';


@Injectable({
    providedIn: 'root'
})
export class CustomerService {

    baseUrl = 'http://localhost:3000/customer';

    constructor(private httpClient: HttpClient) {
    }

      getCustomers(): Observable<ICustomer[]> {
        let url = 'http://localhost:3000/customer/get'
          return this.httpClient.get<ICustomer[]>(url)
              .pipe(catchError(this.handleError));
      }

    // getCustomers(){
    //     let url = 'http://localhost:3000/customer?email=verma.samarpit@gmail.com'
    //     return this.httpClient.get(url)
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

    // getCustomer(id: number): Observable<ICustomer> {
    //     return this.httpClient.get<ICustomer>(`${this.baseUrl}/${id}`)
    //         .pipe(catchError(this.handleError));
    // }

    getCustomer(id){
            let url = 'http://localhost:3000/customer/get?_id='+id
        return this.httpClient.get<ICustomer>(url)
        // return this.httpClient.get(this.baseUrl)
            .pipe(catchError(this.handleError));
    }

    // addCustomer(customer: ICustomer): Observable<ICustomer> {
    //     return this.httpClient.post<ICustomer>(this.baseUrl, customer, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.handleError));
    // }

    addCustomer(customer: ICustomer): Observable<ICustomer> {
        let url = 'http://localhost:3000/customer/post'
        return this.httpClient.post<ICustomer>(url, customer)
            .pipe(catchError(this.handleError));
    }

    updateCustomer(customer: ICustomer){
        let url = 'http://localhost:3000/customer/update'
        return this.httpClient.put(url, customer, {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        })
            .pipe(catchError(this.handleError));
    }

    // updateCustomer(customer: ICustomer) {
    //         let url = 'http://localhost:3000/customer/update'
    //     return this.httpClient.put(`${url}/${customer._id}`, customer, {
    //         headers: new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     })
    //         .pipe(catchError(this.handleError));
    // }

    deleteCustomer(id){
        let url = 'http://localhost:3000/customer/delete?_id='+id
        return this.httpClient.delete(url)
            .pipe(catchError(this.handleError));
    }

}
