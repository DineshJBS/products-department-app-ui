import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import domtoimage from 'dom-to-image';


@Component({
  selector: 'app-myorders',
  templateUrl: './myorders.component.html',
  styleUrls: ['./myorders.component.css']
})
export class MyordersComponent {

  @ViewChild('content',{
    static:false
  }) el! : ElementRef

  showUserDetails : boolean = false;

makePdf(){

     const today = new Date();
    this.currentDate = today.toDateString();

  this.showUserDetails = true;
  const pdf = new jsPDF();
  const content: HTMLElement = this.el.nativeElement;
  const table = content.querySelector('table') as HTMLTableElement;

  domtoimage.toPng(table).then((dataUrl: string) => {
    const imgWidth = 210; // A4 page width in mm
    const imgHeight = table.offsetHeight * (imgWidth / table.offsetWidth);

    pdf.addImage(dataUrl, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${this.username}.orders - ${this.currentDate}.pdf `);
  });
}



currentDate !: string ;
  username!: string;
  password!: string;
  baseUrl: string = 'http://localhost:8080';
  productData: any;
  constructor(private router: Router, private http: HttpClient) {}
  ngOnInit(): void {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
    if (username && password) {
      this.username = username;
      this.password = password;
    }
    this.fetchProducts();
  }
  fetchProducts() {
     this.getProducts().subscribe((data: any) => {
      console.log(data)
      this.productData = data;
      console.log(this.productData);
    });
  }

  getProducts() {
    // const username = sessionStorage.getItem('username');
    // const password = sessionStorage.getItem('password');
    console.log(this.username + ' ' + this.password);
    const userInfo= {
      name: this.username,
      password: this.password,
    }
    const headers = new HttpHeaders().set(
      'Authorization',
      'Basic ' + btoa(this.username + ':' + this.password)
    );
    return this.http.get(this.baseUrl + '/user-orders',  { headers });
  }

  addToCart(product : any){

  }
}
function html2canvas(table: HTMLTableElement | null) {
  throw new Error('Function not implemented.');
}

