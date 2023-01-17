import { Component, OnInit ,Input} from '@angular/core';
import { CartService,CartItem } from '@deepbits/orders';
import { Product } from '../../models/product';

@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'products-product-item',
  templateUrl: './product-item.component.html',
  styles: [],
})
export class ProductItemComponent  {
  @Input()
  product!: Product;
  constructor(private cartService: CartService) { }
  addProductToCart() {
    const cartItem: CartItem = {
      productId: this.product['id'],
      quantity: 1
    };
    this.cartService.setCartItem(cartItem);
  }
}
