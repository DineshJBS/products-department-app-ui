import { Component } from '@angular/core';

@Component({
  selector: 'app-product-table',
  templateUrl: './product-table.component.html',
  styleUrls: ['./product-table.component.css']
})
export class ProductTableComponent {
  // data = [ 
  //   { name : 'James', age : 24, job : 'Designer', employed : true},
  //   { name : 'Jill', age : 26, job : 'Engineer', employed : false},
  //   { name : 'Alice', age : 25, job : 'Engineer', employed : false}
  // ];

  // headers = [
  //   { key : 'employed', label : 'Has a job'},
  //   {key : 'name', label : 'Name'},
  //   { key : 'age', label : 'Age'},
  //   { key : 'job', label : 'Job'}
  // ];

  data = [
    { name : 'Water Bottle', department : 'Plastic', }
  ]

}
