import { Component,OnInit } from '@angular/core';
import { ProductsService,Product } from '@deepbits/products';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products:Product[] =[];
  
  constructor(private productsService:ProductsService) {}
  ngOnInit(): void {
    this._getProducts();
  }
  deleteProduct(productID: string) {
    productID = "w";
  }
  updateProduct(productID: string) {
    productID = "w";
  }

  private _getProducts() {
    this.productsService.getProducts().subscribe((product) => {
      this.products = product;
    });
  }
  

}
