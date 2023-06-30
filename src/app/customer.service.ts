import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  baseUrl: string = 'http://localhost:8080/customer';

  constructor(private http: HttpClient) {}

  addCustomer(customer: any) {
    return this.http.post(this.baseUrl + '/signup-submit', customer);
  }
}
