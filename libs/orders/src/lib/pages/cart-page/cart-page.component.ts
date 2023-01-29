import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Cart, CartItemDetailed, CartService } from '@deepbits/orders';
import{OrdersService} from '@deepbits/orders'
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'orders-cart-page',
  templateUrl: './cart-page.component.html',
  styles: [],
})
export class CartPageComponent implements OnInit {
  cartCount = 0;
  isCheckout = false;
  endSubs$: Subject<any> = new Subject();
  cartItemsDetailed: CartItemDetailed[] = [];
  constructor(
    private router: Router,
    private ordersService: OrdersService,
    private cartService: CartService
  ) {
    
  }
  ngOnInit(): void {
    this._getCartDetails();
  }
  backToShop() {
    this.router.navigate(['/products']);
  }
  
  
  private _getCartDetails() {
    this.cartService.cart$.pipe(takeUntil(this.endSubs$)).subscribe((respCart) => {
      this.cartItemsDetailed = [];
      this.cartCount = respCart?.items.length ?? 0;
      respCart.items.forEach((cartItem) => {
        this.ordersService.getProduct(cartItem.productId).subscribe((respProduct) => {
          this.cartItemsDetailed.push({
            product: respProduct,
            quantity: cartItem.quantity
          });
        });
      });
    });
  }
  deleteCartItem(cartItem: CartItemDetailed) {
    this.cartService.deleteCartItem(cartItem.product.id);
   }
  updateCartItemQuantity(event, cartItem: CartItemDetailed) {
    this.cartService.setCartItem(
      {
        productId: cartItem.product.id,
        quantity: event.value
      },
      true
    );
  }
}
