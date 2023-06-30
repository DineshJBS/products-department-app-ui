import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.css']
})
export class DropdownComponent {

 

  @Input() options: any[] = [];
  selectedProduct! : string;
  // productNames! : any[];
  constructor() {
    // this.selectedProduct = ''; // Set initial value for selectedProduct
  }
  // ngOnInit() {
  //   console.log(this.options);
  //   this.productNames = [];
  
  //   this.options.forEach((department: any) => {
  //     department.products.forEach((product: any) => {
  //       this.productNames.push(product.name);
  //     });
  //   });
  
  //   console.log("this is productNames: " + this.productNames);
  // }
  
  
  
  }

 
 


