import { Component,OnInit } from '@angular/core';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products = [];
  
  constructor() {}
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }
  deleteProduct(productID: string) {
    productID = "w";
  }
  updateProduct(productID: string) {
    productID = "w";
  }

  

}
