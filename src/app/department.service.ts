import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DepartmentService {
  baseUrl : string = 'http://localhost:8080/department';


  constructor(private http: HttpClient) { }

  getDepartments(){
    return this.http.get(this.baseUrl + '/')
  }
}
