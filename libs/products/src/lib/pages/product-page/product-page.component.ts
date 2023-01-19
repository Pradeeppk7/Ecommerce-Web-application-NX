/* eslint-disable no-dupe-else-if */
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem, CartService } from '@deepbits/orders';
import { Subject, takeUntil } from 'rxjs';
import { Product } from '../../models/product';
import { ProductsService } from '../../services/products.service';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-page',
  templateUrl: './product-page.component.html',
  styles: [],
})
export class ProductPageComponent implements OnInit, OnDestroy {
  product: Product;
  quantity = 1;
  beforeprice: number;
  richDesc: string | undefined;
  img: string[] | undefined;
  endSubs$: Subject<any> = new Subject();
  constructor(
    private prodservice: ProductsService,
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}
  ngOnDestroy(): void {
    this.endSubs$.complete();
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      if (params['productid']) {
        this._getProduct(params['productid']);
      }
    });
  }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product.id,
      quantity: this.quantity
    }
    this.cartService.setCartItem(cartItem);
  }
  private _getProduct(id: string) {
    this.prodservice
      .getProduct(id)
      .pipe(takeUntil(this.endSubs$))
      .subscribe((product) => {
        this.product = product;
        this.beforeprice = Number(product.price);
        this.richDesc = product.richDescription;
        this.img = product.images;
        if (this.beforeprice < 250) {
          this.beforeprice += 100;
        } else if (this.beforeprice < 2000) {
          this.beforeprice += 500;
        } else if (this.beforeprice < 15000) {
          this.beforeprice += 1500;
        } else if (this.beforeprice < 20000) {
          this.beforeprice += 5000;
        } else if (this.beforeprice < 50000) {
          this.beforeprice += 7000;
        }
      });
  }
}
