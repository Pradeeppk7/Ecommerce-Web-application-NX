import { Injectable } from '@angular/core';
import { Cart, CartItem } from '@deepbits/orders';
import { BehaviorSubject } from 'rxjs';
export const CART_KEY = 'cart';
@Injectable({
  providedIn: 'root',
})
export class CartService {
  cart$: BehaviorSubject<Cart> = new BehaviorSubject(this.getCart());
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
  initCartLocalStorage() {
    const cart: Cart = this.getCart();
    if (!cart) {
      const intialCart = {
        items: []
      };
      const intialCartJson = JSON.stringify(intialCart);
      localStorage.setItem(CART_KEY, intialCartJson);
    }
  }

  emptyCart() {
    const intialCart = {
      items: []
    };
    const intialCartJson = JSON.stringify(intialCart);
    localStorage.setItem(CART_KEY, intialCartJson);
    this.cart$.next(intialCart);
  }

  getCart(): Cart {
    const cartJsonString: string = localStorage.getItem(CART_KEY);
    const cart: Cart = JSON.parse(cartJsonString);
    return cart;
  }

  setCartItem(cartItem: CartItem, updateCartItem?: boolean): Cart {
    const cart = this.getCart();
    const cartItemExist = cart.items.find((item) => item.productId === cartItem.productId);
    if (cartItemExist) {
      cart.items.map((item) => {
        if (item.productId === cartItem.productId) {
          if (updateCartItem) {
            item.quantity = cartItem.quantity;
          } else {
            item.quantity = item.quantity + cartItem.quantity;
          }

          return item;
        }
      });
    } else {
      cart.items.push(cartItem);
    }

    const cartJson = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJson);
    this.cart$.next(cart);
    return cart;
  }

  deleteCartItem(productId: string) {
    const cart = this.getCart();
    const newCart = cart.items.filter((item) => item.productId !== productId);

    cart.items = newCart;

    const cartJsonString = JSON.stringify(cart);
    localStorage.setItem(CART_KEY, cartJsonString);

    this.cart$.next(cart);
  }
}
