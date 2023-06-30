import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  signupForm = new FormGroup({
    userName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
    ]),
  });

  constructor(
    private router: Router,
    private customerService: CustomerService
  ) {}

  signupFormData: { userName: string; email: string; password: string }[] = [];

  // loginData! : {userName: string; password: string;} ;

  // loginDataArray! : {userName: string; password: string;}[];

  onSubmit() {
    const customerData = {
      name: this.signupForm.value.userName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      roles : "ROLE_USER"
    };

    this.customerService.addCustomer(customerData).subscribe({
      next: (v) => console.log('Product added successfully'),
      error: (err) => console.log('Error adding customer'),
    });
    this.router.navigate(['/signin']);
  }
}
