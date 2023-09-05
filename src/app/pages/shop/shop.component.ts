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
    const productsCache = sessionStorage.getItem('products');
    if (productsCache)
      this.products = JSON.parse(productsCache);
    console.log("Saved Products", this.products);

    this.getProducts();
  }

  getProducts() {
    this.shopifyService.getProducts().subscribe(({data, loading}) => {
      let nodes = data as any;
      nodes = nodes.products.edges;
      this.addProducts(nodes);
      console.log("Nodes", nodes);
      console.log("Products", this.products);
    });
  }

  categoryChange() {
    // do something here
    console.log(this.category);
  }

  addProducts(nodes) {
    const list = [];
    for(let node of nodes) {
      list.push({
        id: node.node.id,
        title: node.node.title,
        description: node.node.description,
        createdAt: node.node.createdAt,
        image: node.node.featuredImage.thumbnail,
        image_full_res: node.node.featuredImage.high_res,
        images: node.node.images.edges,
        price: Number(node.node.priceRange.minVariantPrice.amount).toFixed(2),
      });
    }
    this.products = list;
    sessionStorage.setItem('products', JSON.stringify(this.products));
  }

  viewProduct(product) {
    const initialState = {
      initialState: {
        product: product
      },
      title: 'modal',
      class: 'modal-lg'
    };
    this.modalRef = this.modalService.show(ViewProductModalComponent, initialState as ModalOptions);
    this.modalRef.content.product = product;
  }
}
