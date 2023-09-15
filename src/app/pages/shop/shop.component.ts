import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopifyService } from 'src/app/services/shopify.service';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ViewProductModalComponent} from "../../layout/modals/view-product-modal.component";
import {ToastrService} from "ngx-toastr";
import {fadeIn} from "../../animations/fade-in.animation";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css'],
  animations: [fadeIn]
})
export class ShopComponent implements OnInit {

  // TODO: Paginate products

  modalRef: BsModalRef;
  category = '';
  products = [];
  onlineImg = true;

  constructor(private route: ActivatedRoute,
              private shopifyService: ShopifyService,
              private modalService: BsModalService,
              private toastr: ToastrService) { }

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

    this.categoryChange();
  }

  getProducts() {
    this.shopifyService.getAllProducts().subscribe(({data, loading}) => {
      let nodes = data as any;
      nodes = nodes.products.edges;
      this.addProducts(nodes);
      console.log("Nodes", nodes);
      console.log("Products", this.products);
    });
  }

  getCollection(collection = this.category) {
    // FIXME: Fix collection handles in shopify
    if(collection == 'mens') {
      collection = 'mens-1';
    }
    this.shopifyService.getCollection(collection).subscribe(({data, loading}) => {
      let nodes = data as any;
      console.log('data', nodes);
      if(nodes.collectionByHandle == null) {
        this.products = [];
        this.toastr.error("Collection not found");
        return;
      }
      nodes = nodes.collectionByHandle.products.edges;
      this.addProducts(nodes);
      console.log("Products parsed", this.products);
    });
  }

  categoryChange() {
    if(this.category == 'all') {
      this.getProducts();
    }
    else {
      this.getCollection();
    }
  }

  addProducts(nodes) {
    const list = [];
    for(let node of nodes) {
      if(node.node.variants.edges[0].node.availableForSale === false) continue;
      list.push({
        id: node.node.id,
        variant_id: node.node.variants.edges[0].node.id,
        title: node.node.title,
        description: node.node.description,
        createdAt: node.node.createdAt,
        image: node.node.featuredImage.thumbnail,
        image_full_res: node.node.featuredImage.url,
        images: node.node.images.edges,
        price: Number(node.node.priceRange.minVariantPrice.amount).toFixed(2),
        size: node.node.variants.edges[0].node.title,
        collections: [],
      });
      for(let collection of node.node.collections.edges) {
        list[list.length - 1].collections.push(collection.node.title);
      }
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
