import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor() { }

  cartData : any =[];

  addDataToCart(product  :any){
    console.log(product + "from cart service")
    this.cartData.push(product);
    console.log(this.cartData);
  }
}
