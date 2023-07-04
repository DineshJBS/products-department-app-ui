import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent {

  username!: string;
  password!: string;
  departmentData: any;
  // productNames!: any[];

  constructor(private http: HttpClient) {}
  baseUrl: string = 'http://localhost:8080/department';
  getDepartments() {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.get(this.baseUrl + '/', { headers });
  }

  ngOnInit() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }
    this.getDepartments().subscribe((data: any) => {
      this.departmentData = data;

      console.log('Departmetn data :');
      console.log(this.departmentData);
    });
  }

  hidebox:boolean=true;
  productsList : any;

  displayProductsFromDepartment(department : any){
    this.hidebox = false;
    console.log(department.products)
    this.productsList = department.products;
    console.log(this.productsList)
  }


}
