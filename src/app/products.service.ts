import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  baseUrl : string = 'http://localhost:8080/products';

  constructor(private http : HttpClient) { }

  getProducts() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    const headers = new HttpHeaders()
      .set('Authorization', 'Basic ' + btoa(username + ':' + password));
    return this.http.get(this.baseUrl, { headers });
  }
  
  
  
  addProduct(product : any){
    return this.http.post(this.baseUrl, product);
  }

  deleteProduct(productName : string){
    return this.http.delete(this.baseUrl + '/' + productName);
  }
}
