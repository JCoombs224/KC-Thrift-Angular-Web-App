import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {faShoppingCart, faX} from "@fortawesome/free-solid-svg-icons";
import {CartService} from "../../services/cart.service";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'app-view-product-modal',
  templateUrl: 'view-product-modal.component.html',
})
export class ViewProductModalComponent implements OnInit {

  modalRef: BsModalRef;
  product;
  isFullscreen = false;
  fullScreenUrl = '';
  inCart = false;
  hoveringCart = false;

  constructor(public bsModalRef: BsModalRef,
              public cart: CartService,
              private toastr: ToastrService) {}

  ngOnInit() {
    this.inCart = this.cart.inCart(this.product);
  }

  public cancel() {
    this.bsModalRef.hide();
  }

  public addToCart() {
    this.cart.addToCart(this.product);
    this.toastr.success("Product added to cart");
    this.bsModalRef.hide();
  }

  public removeFromCart() {
    this.cart.removeFromCart(this.product);
    this.toastr.success("Product removed from cart");
    this.bsModalRef.hide();
  }

  toggleFullscreen(url?) {
    if(url) {
      this.fullScreenUrl = url;
      this.isFullscreen = true;
    }
    else {
      this.isFullscreen = false;
      this.fullScreenUrl = '';
    }
  }

  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faX = faX;
}
