import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
// import { LocalStorageService } from '../local-storage.service';

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.css'],
})
export class DepartmentComponent {
  @Input() departmentData!: any;
  username!: string;
  password!: string;
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
}
