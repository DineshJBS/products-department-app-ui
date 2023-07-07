import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(private http  :HttpClient, private router : Router){}

  forgotpassword = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    
  });
  passwordResetForm = new FormGroup({
    newPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    
  });
  otpForm = new FormGroup({
    otpNumber: new FormControl('', [
      Validators.required,
     
    ]),
    
  });
  baseUrl: string = 'http://localhost:8080/customer';
  email! : string;
  showOtpForm : boolean = true;
  showPasswordResetForm : boolean = true;
  otpNumber! : string;
  newPassword! : string;

  onSubmit(){
    this.email = this.forgotpassword.value.email??'';
    console.log(this.forgotpassword.value.email)
    this.showOtpForm = false;

     
  }


    onSubmitOtp(){
     
      console.log(this.otpForm.value.otpNumber??'')
      this.otpNumber = this.otpForm.value.otpNumber??'';

      this.sendRequestToBackEnd().subscribe((response : any) => {
        console.log(response.status);
        if(response.status === 'true'){
          this.showPasswordResetForm = false;
        }
      }
        
      );
  
    }  

    sendRequestToBackEnd(){
      const forgotpasswordRequest = {
        email : this.email,
        otp : this.otpNumber
      }
      
      return this.http.post(this.baseUrl + '/forgotpassword', forgotpasswordRequest);
    }

    onSubmitResetPassword(){

      console.log(this.passwordResetForm.value.newPassword??'')
      this.newPassword = this.passwordResetForm.value.newPassword??'';

      this.sendNewPasswordToDatabase().subscribe(

      );

      this.router.navigate(['/signin'])
    }

    sendNewPasswordToDatabase(){
      const newPassword = {
        email : this.email,
        newPassword : this.newPassword
      }

      return this.http.post(this.baseUrl + '/resetpassword', newPassword);
    }


}
