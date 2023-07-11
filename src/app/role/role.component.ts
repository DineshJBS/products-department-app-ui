import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent {
  username!: string;
  password!: string;

  constructor(private http: HttpClient){}
  
users : any = [];
baseUrl: string = 'http://localhost:8080';



ngOnInit(): void {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (username && password) {
    this.username = username;
    this.password = password;
  }
  this.getRoles().subscribe((response : any) => {
    this.users = response;
    console.log(this.users)
  });
}
getRoles(){
  console.log(this.username + ' ' + this.password);
  const userInfo= {
    name: this.username,
    password: this.password,
  }
  const headers = new HttpHeaders().set(
    'Authorization',
    'Basic ' + btoa(this.username + ':' + this.password)
  );
  return this.http.get(this.baseUrl + '/customer/getroles',  { headers });
}

changeToAdmin(user : any){
  const userData ={
    name : user.name,
    role : "ROLE_ADMIN"
  }

  const headers = new HttpHeaders().set(
    'Authorization',
    'Basic ' + btoa(this.username + ':' + this.password)
  );
  return this.http.post('http://localhost:8080/customer/changerole/admin', userData,  { headers }).subscribe({
    next: () => console.log('Product added successfully'),
      error: () => console.log('Error adding product'),
  }
  );
}
 
changeToUser(user : any){
  console.log(user)
  const userData ={
    name : user.name,
    role : "ROLE_USER"
  }
  const headers = new HttpHeaders().set(
    'Authorization',
    'Basic ' + btoa(this.username + ':' + this.password)
  );
  return this.http.post('http://localhost:8080/customer/changerole/user', user,  { headers }).subscribe({
    next: () => console.log('Product added successfully'),
      error: () => console.log('Error adding product'),
  });
}

}
