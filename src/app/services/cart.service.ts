import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CartService {

  public cart = [];
  private cartStatus = new BehaviorSubject<boolean>(false);
  cartStatus$ = this.cartStatus.asObservable();

  constructor() {
    const cartCache = localStorage.getItem('cart');
    if (cartCache) {
      this.cart = JSON.parse(cartCache);
    }
  }

  toggleCart(status?: boolean) {
    if (status !== undefined) {
      this.cartStatus.next(status);
    } else {
      this.cartStatus.next(!this.cartStatus.value);
    }
  }

  addToCart(product) {
    this.cart.push(product);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  private getCart() {
    return JSON.parse(localStorage.getItem('cart'));
  }

  getCartCount() {
    return this.cart.length;
  }

  getCartTotal() {
    let total = 0;
    for(let product of this.getCart()) {
      total += Number(product.price);
    }
    return total.toFixed(2);
  }

  removeFromCart(product) {
    const index = this.cart.indexOf(product);
    this.cart.splice(index, 1);
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }

  clearCart() {
    this.cart = [];
    localStorage.setItem('cart', JSON.stringify(this.cart));
  }
}


