import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopifyService } from 'src/app/services/shopify.service';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ViewProductModalComponent} from "../../layout/modals/view-product-modal.component";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {

  modalRef: BsModalRef;
  category = '';
  products = [];
  onlineImg = true;

  constructor(private route: ActivatedRoute,
              private shopifyService: ShopifyService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    // Subscribe to the route params to get the category
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.categoryChange();
    });
    this.shopifyService.getProducts().subscribe(({data, loading}) => {
      let nodes = data as any;
      nodes = nodes.products.edges;
      this.addProducts(nodes);
      console.log(this.products);
    });
    // log the shopify products to the console
  }

  categoryChange() {
    // do something here
    console.log(this.category);
  }

  addProducts(nodes) {
    for(let node of nodes) {
      this.products.push({
        id: node.node.id,
        title: node.node.title,
        description: node.node.description,
        createdAt: node.node.createdAt,
        image: node.node.featuredImage.url
      });
    }
  }

  viewProduct(product) {
    const initialState = {
      initialState: {
        product: product,
        callback: (result) => {

        },
      },
      title: 'modal',
      backdrop: 'static',
      class: 'modal-lg'
    };
    this.modalRef = this.modalService.show(ViewProductModalComponent, initialState as ModalOptions);
    this.modalRef.content.product = product;
  }
}
