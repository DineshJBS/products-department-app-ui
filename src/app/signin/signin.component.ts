import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../shared/auth.service';
import { catchError, throwError } from 'rxjs';

// import { AuthService } from '../auth.service';

// import * as bcrypt from 'bcrypt'
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css'],
})
export class SigninComponent {
  signinForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private router: Router,
    private http: HttpClient,
    private authService: AuthService
  ) {}

  username!: string;
  password!: string;

  ngOnInit() {}

  getCredentials() {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }
  }

  saveDataToStorage() {
    const username = this.signinForm.value.userName ?? '';
    const password = this.signinForm.value.password ?? '';
    localStorage.setItem('username', username);
    localStorage.setItem('password', password);
  }

  resetStorage() {
    localStorage.removeItem('username');
    localStorage.removeItem('password');
  }

  baseUrl: string = 'http://localhost:8080/customer';

  onSubmit() {
    this.saveDataToStorage();
    this.getCredentials();
    const userInfo = {
      name: this.username,
      password: this.password,
    };

    this.validateUser(userInfo)
      .pipe(
        catchError((error) => {
          // Here you can handle the error and retrieve the HTTP status code
          const statusCode = error.status;
          // Do something with the status code

          if (statusCode === 401 || statusCode === 403) {
            alert('Invalid Credentials!');
          }
          if (statusCode === 200) {
            localStorage.setItem('isUserLoggedIn', 'true');
            this.router.navigate(['/home']);
          }

          return throwError(error);
        })
      )
      .subscribe((response) => (response: any) => {});
  }

  validateUser(userInfo: any) {
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );

    return this.http.post(this.baseUrl + '/login', userInfo, { headers });
  }
}
