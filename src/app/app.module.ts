import { NgModule, inject } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { InputComponent } from './input/input.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SigninComponent } from './signin/signin.component';
import {
  ActivatedRouteSnapshot,
  RouterModule,
  RouterStateSnapshot,
  Routes,
} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { FormsModule } from '@angular/forms';

import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { ButtonComponent } from './button/button.component';
import { ProductTableComponent } from './product-table/product-table.component';

import { DepartmentComponent } from './department/department.component';
import { BlogComponent } from './blog/blog.component';
// import { authGuard } from './shared/auth.guard';

import { isUserLoggedInGuard } from './shared/auth.guard';
import { SigninbroComponent } from './signinbro/signinbro.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DropdownComponent } from './dropdown/dropdown.component';
import { DataComponent } from './data/data.component';
import { MyordersComponent } from './myorders/myorders.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { CartComponent } from './cart/cart.component';
import { ThankyouComponent } from './thankyou/thankyou.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { RoleComponent } from './role/role.component';
// import { DataComponent } from './data/data.component';

const routers: Routes = [
  { path: '', component: SignupComponent },
  { path: 'signin', component: SigninComponent },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [isUserLoggedInGuard],
  },
  // { path : 'navbar', component : NavbarComponent},
  {
    path: 'department',
    component: DepartmentComponent,
    canActivate: [isUserLoggedInGuard],
  },
  {
    path: 'blog',
    component: BlogComponent,
    canActivate: [isUserLoggedInGuard],
    
  },
  {
    path :'data' , component : DataComponent, canActivate: [isUserLoggedInGuard]
  },
  {
    path :'productList' , component : ProductsListComponent, canActivate: [isUserLoggedInGuard]
  },
  {
    path :'cart' , component : CartComponent, canActivate: [isUserLoggedInGuard]
  },
  {
    path :'thankyou' , component : ThankyouComponent, canActivate: [isUserLoggedInGuard]
  },
  {
    path :'role' , component : RoleComponent, canActivate: [isUserLoggedInGuard]
  },
  {
    path :'forgotpassword' , component : ForgotPasswordComponent, 
  },
  {
    path :'myorders' , component : MyordersComponent, canActivate: [isUserLoggedInGuard]
  },
  { path : 'product-department', component:ProductTableComponent, canActivate: [isUserLoggedInGuard]},
  { path: '**', component: SigninbroComponent },
  
 
];

@NgModule({
  declarations: [
    AppComponent,
    SignupComponent,
    InputComponent,
    SigninComponent,

    NavbarComponent,
    HomeComponent,
    ButtonComponent,
    ProductTableComponent,
    DepartmentComponent,
    BlogComponent,
    SigninbroComponent,
    DropdownComponent,
    DataComponent,
    MyordersComponent,
    ProductsListComponent,
    CartComponent,
    ThankyouComponent,
    ForgotPasswordComponent,
    RoleComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routers),
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
