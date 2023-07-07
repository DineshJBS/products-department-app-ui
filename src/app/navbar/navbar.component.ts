import { Component } from '@angular/core';
// import { MatToolbar } from '@angular/material/toolbar';
import { Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

  isAdmin: boolean = false;
  adminOrUser : string = 'Admin'
  username!: string;
  password!: string;
  constructor (private router : Router, private authService : AuthService, private http : HttpClient){}
  
  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }
    this.getRole().subscribe((response : any) => {
      console.log(response);
      if(response.role === 'ROLE_ADMIN'){
        this.isAdmin = true;
      }else{
        this.isAdmin = false;
      }
    })
  }
  
  signOut(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('isUserLoggedIn', 'false');
    console.log(localStorage.getItem('isUserLoggedIn'))
    this.authService.isUserLoggedIn = false;
  }

  getRole(){
    console.log(this.username + ' ' + this.password);
    const userInfo= {
      name: this.username,
      password: this.password,
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.get("http://localhost:8080/customer/role",  { headers });
  }
  toggleAdmin(): void {
    //  this.isAdmin =!this.isAdmin
    // if (this.isAdmin) {
    //   this.adminOrUser = 'Admin'
    //   this.router.navigate(['/blog']);
    // } else {
    //   this.adminOrUser = 'User'
    //   this.router.navigate(['/blog']);
    // }
  }
  
  
}
