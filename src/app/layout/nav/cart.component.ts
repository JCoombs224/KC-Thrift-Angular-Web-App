import { Component } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  isOpen = false;
  private sub: any;

  constructor(public cart: CartService) {}

  ngOnInit() {
    this.sub = this.cart.cartStatus$.subscribe(status => {
      this.isOpen = status;
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  closeCart() {
    this.cart.toggleCart(false);
  }

  protected readonly close = close;
  protected readonly faTrash = faTrash;
}
