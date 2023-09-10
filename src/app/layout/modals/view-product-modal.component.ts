import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";
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

  constructor(public bsModalRef: BsModalRef,
              public cart: CartService,
              private toastr: ToastrService) {}

  ngOnInit() {

  }

  public cancel() {
    this.bsModalRef.hide();
  }

  public addToCart() {
    this.cart.addToCart(this.product);
    this.toastr.success("Product added to cart");
    this.bsModalRef.hide();
  }

  toggleFullscreen(url?) {
    console.log(true);
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
}
