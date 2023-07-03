import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  product = new FormGroup({
    productName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    department: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
  });
  baseUrl: string = 'http://localhost:8080/products';

  username!: string;
  password!: string;

  productData!: any;
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }
    this.fetchProducts();
  }

  // http methods

  getProducts() {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    console.log(this.username + ' ' + this.password);
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.get(this.baseUrl, { headers });
  }

  addProduct(product: any) {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.post(this.baseUrl, product, { headers });
  }

  updateProduct(product: any, oldProductId: any) {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.put(this.baseUrl + '/' + oldProductId, product, {
      headers,
    });
  }

  deleteProduct(productId: string) {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.delete(this.baseUrl + '/' + productId, { headers });
  }

  fetchProducts() {
    this.getProducts().subscribe((data: any) => {
      this.productData = data;
      console.log(this.productData);
    });
  }

  onSubmit() {
    const productFormData = {
      productName: this.product.value.productName,
      deptName: this.product.value.department,
    };
    this.addProduct(productFormData).subscribe({
      next: (v) => console.log('Product added successfully'),
      error: (err) => console.log('Error adding product'),
    });
    console.log(productFormData);
    // this.productData = productFormData;
    // window.location.reload();
    console.log('Product table is trying to reload************');
    this.fetchProducts();
  }

  update(product: any) {
    console.log('this is old product name ' + product);
    let oldProductId = product.productId;
    let productName = window.prompt('Enter the product name!');
    let departmentName = window.prompt('Enter the department name!');

    product.productName = productName;
    product.deptName = departmentName;
    console.log(
      'This is updated product names : ' +
        product.productName +
        ' ' +
        product.deptName
    );

    const productFormData = {
      productName: product.productName,
      deptName: product.deptName,
    };
    this.updateProduct(productFormData, oldProductId).subscribe({
      next: (v) => console.log('Product updated successfully'),
      error: (err) => console.log('Error updating product'),
    });
    console.log('This is the updated product data : ' + productFormData);
  }

  delete(product: any) {
    // const productToDelete = {
    //   productName: product.productName,
    //   deptName: product.deptName,
    // };
    // console.log(productToDelete.productName + ' ' + productToDelete.deptName);
    this.deleteProduct(product.productId).subscribe({
      next: (v) => {
        console.log('Product deleted successfully' + v);
        this.productData = this.productData.filter(
          (p: any) => p.productName !== product.productName
        );
      },
      error: (err) => {
        console.log('Error deleting the product:', err);
      },
    });
    this.fetchProducts();
  }
}
