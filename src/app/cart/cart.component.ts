import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent {
  username!: string;
  password!: string;
  totalPrice! : number
  baseUrl: string = 'http://localhost:8080';
  constructor(private cartService: CartService, private http: HttpClient, private router : Router) {}
  cartProducts: any = [];
  cartProductsForView : any =[];
  
  ngOnInit() {
    this.username = localStorage.getItem('username') ?? '';
  this.password = localStorage.getItem('password') ?? '';

  const storedCartProducts = localStorage.getItem('cartData');
  if (storedCartProducts) {
    this.cartProducts = JSON.parse(storedCartProducts);
  } 

  this.cartProductsForView = [...this.cartProducts];
  
  console.log(this.cartProductsForView); // Display the updated cartProductsForView
  console.log(this.cartProducts + ' From cart component ts');
  this.totalPrice = this.cartProductsForView.reduce((sum: number, product: any) => {
    return sum + product.price;
  }, 0);
  
  }

  emptyCart() {
    localStorage.removeItem('cartData');
    localStorage.removeItem('products');
    // window.location.reload();
    this.router.navigate(['/thankyou']);
  }

  buyNow() {
    this.addProduct(this.cartProducts).subscribe({
      next: () => console.log('Product added successfully'),
      error: () => console.log('Error adding product'),
    });
    localStorage.removeItem('products');
       
    this.emptyCart()
  }

  addProduct(products: any) {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    console.log(products);
    return this.http.post('http://localhost:8080/add-to-cart', products, {
      headers,
    });
  }
}
