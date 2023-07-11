import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent {

  currency : string = '$'
  username!: string;
  password!: string;
  baseUrl: string = 'http://localhost:8080';
  productData: any;
  constructor(private router: Router, private http: HttpClient, private cart : CartService) {}
  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }
    this.fetchProducts();
  }
  fetchProducts() {
     this.getProducts().subscribe((data: any) => {
      console.log(data)
      this.productData = data;
      console.log(this.productData);
    });
  }

  getProducts() {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    console.log(this.username + ' ' + this.password);
    const userInfo= {
      name: this.username,
      password: this.password,
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.get(this.baseUrl + '/user-products',  { headers });
  }


cartData : any =[];
  addToCart(product : any){
    const storedCartData = localStorage.getItem('cartData');
    let cartData: any[] = storedCartData ? JSON.parse(storedCartData) : [];
    cartData.push(product);
    localStorage.setItem('cartData', JSON.stringify(cartData));
    console.log(localStorage.getItem('cartData') + ' from local storage get');
  } 
}
