import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {faShoppingCart} from "@fortawesome/free-solid-svg-icons";

@Component({
  selector: 'app-view-product-modal',
  templateUrl: 'view-product-modal.component.html',
})
export class ViewProductModalComponent implements OnInit {

  modalRef: BsModalRef;
  product;

  constructor(public bsModalRef: BsModalRef) {

  }

  ngOnInit() {

  }

  public cancel() {
    if (this.bsModalRef.content.callback != null) {
      this.bsModalRef.content.callback(false);
      this.bsModalRef.hide();
    }
  }

  protected readonly faShoppingCart = faShoppingCart;
}
