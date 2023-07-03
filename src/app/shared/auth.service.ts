import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  [x: string]: any;

  constructor() {}

  loginString = localStorage.getItem('isUserLoggedIn');

  isUserLoggedIn!: boolean;

  checkLogin() {
    if (localStorage.getItem('isUserLoggedIn') === 'true') {
      console.log('From Auth service loginString value : ' + this.loginString);
      return (this.isUserLoggedIn = true);
    }

    return (this.isUserLoggedIn = false);
  }
}
