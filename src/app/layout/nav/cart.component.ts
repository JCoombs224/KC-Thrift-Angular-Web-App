import { Component } from '@angular/core';
import {CartService} from "../../services/cart.service";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import {ViewProductModalComponent} from "../modals/view-product-modal.component";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ShopifyService} from "../../services/shopify.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  modalRef: BsModalRef;
  isOpen = false;
  private sub: any;

  constructor(public cart: CartService,
              private modalService: BsModalService,
              private shopifyService: ShopifyService) {}

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

  viewProduct(product) {
    const initialState = {
      initialState: {
        product: product
      },
      title: 'modal',
      class: 'modal-xl'
    };
    this.modalRef = this.modalService.show(ViewProductModalComponent, initialState as ModalOptions);
    this.modalRef.content.product = product;
  }

  checkout() {
    this.shopifyService.checkoutCreate(this.cart.cart).subscribe(({data, loading}) => {
      const c = data as any;
      window.open(c.checkoutCreate.checkout.webUrl);
    });
  }

  protected readonly close = close;
  protected readonly faTrash = faTrash;
}
