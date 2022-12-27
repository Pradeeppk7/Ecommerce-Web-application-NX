import { Component,OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService,Product } from '@deepbits/products';

@Component({
  selector: 'admin-product-list',
  templateUrl: './product-list.component.html',
  styles: [],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  
  constructor(private productsService: ProductsService,
    private router:Router) { }
  ngOnInit(): void {
    this._getProducts();
  }
  deleteProduct(productID: string) {
    productID = "w";
  }
  updateProduct(productID: string) {
      this.router.navigateByUrl(`products/form/${productID}`)
    }

  private _getProducts() {
    this.productsService.getProducts().subscribe((product) => {
      this.products = product;
    });
  }
}
