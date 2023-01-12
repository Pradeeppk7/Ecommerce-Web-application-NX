import { Component, OnDestroy, OnInit } from '@angular/core';
import { Product } from '@deepbits/products';
import { Subject, takeUntil } from 'rxjs';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-featured-products',
  templateUrl: './featured-product.component.html',
  styles: [],
})
export class FeaturedProductComponent implements OnInit,OnDestroy {
  fproducts: Product[] = [];
  endSubs$: Subject<any> = new Subject;
  constructor(private productService: ProductsService) { }
  ngOnInit(): void {
    this._getFeaturedProducts();
  }
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }
  private _getFeaturedProducts() {
    this.productService.getFeaturedProducts(4).pipe(takeUntil(this.endSubs$)).subscribe(products => {
      this.fproducts = products;
    })
  }
}
