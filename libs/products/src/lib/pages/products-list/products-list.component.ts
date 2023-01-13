import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styles: [],
})
export class ProductsListComponent implements OnInit{
  products: Product[] = [];
  constructor(private productService: ProductsService) { }

  ngOnInit(): void {
    
    this._getProducts();
  }
  private _getProducts() {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
    })
  }
}
