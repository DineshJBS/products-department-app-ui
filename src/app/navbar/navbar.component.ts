import { Component } from '@angular/core';
// import { MatToolbar } from '@angular/material/toolbar';
import { Router} from '@angular/router';
import { AuthService } from '../shared/auth.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  loggedin : boolean = false;

  constructor (private router : Router, private authService : AuthService){}

  signOut(){
    localStorage.removeItem('username');
    localStorage.removeItem('password');
    localStorage.setItem('isUserLoggedIn', 'false');
    console.log(localStorage.getItem('isUserLoggedIn'))
    this.authService.isUserLoggedIn = false;
  }
}
