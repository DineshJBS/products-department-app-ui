import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  username! : string;
  password! : string;
  productsDepartmentsData : any;


  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:8080/productsAndDepartments';
 
  ngOnInit(){
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }

    this.getProductsAndDepartments().subscribe((data: any) => {
      this.productsDepartmentsData = data;

      console.log(' data :');
      console.log(this.productsDepartmentsData);
    });
  }
  getProductsAndDepartments() {
    console.log(this.username + " " + this.password)
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.get(this.baseUrl, { headers });

  }
}
