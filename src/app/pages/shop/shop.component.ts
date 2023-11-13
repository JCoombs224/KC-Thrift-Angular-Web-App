import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopifyService } from 'src/app/services/shopify.service';
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {ViewProductModalComponent} from "../../layout/modals/view-product-modal.component";
import {fadeIn} from "../../animations/fade-in.animation";
import {CartService} from "../../services/cart.service";

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
  subCategory = '';
  showFilters = false;
  products = [];
  onlineImg = true;
  loadingProducts = true;

  constructor(private route: ActivatedRoute,
              private shopifyService: ShopifyService,
              private cartService: CartService,
              private modalService: BsModalService) { }

  ngOnInit(): void {
    // Subscribe to the route params to get the category
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.subCategory = params['subcategory'];
      this.categoryChange();
    });
    const productsCache = sessionStorage.getItem('products');
    if (productsCache) {
      this.products = JSON.parse(productsCache);
      this.loadingProducts = false;
    }
    // console.log("Saved Products", this.products);

    this.categoryChange();
  }

  getProducts() {
    this.loadingProducts = true;
    this.shopifyService.getAllProducts().subscribe(({data, loading}) => {
      this.loadingProducts = false;
      let nodes = data as any;
      nodes = nodes.products.edges;
      this.addProducts(nodes);
      // console.log("Nodes", nodes);
      // console.log("Products", this.products);
    },(e) => {
      console.log(e);
      this.loadingProducts = false;
    });
  }

  getCollection(collection = this.category) {
    // FIXME: Fix collection handles in shopify
    if(collection == 'mens') {
      collection = 'mens-1';
    }
    if(collection == 'womens') {
      this.showFilters = true;
    } else {
      this.showFilters = false;
    }
    if(this.subCategory && this.category == 'womens') {
      collection = collection + '-' + this.subCategory;
    }

    // console.log('collection', collection);
    this.loadingProducts = true;
    this.shopifyService.getCollection(collection).subscribe(({data, loading}) => {
      this.loadingProducts = false;
      let nodes = data as any;
      // console.log('data', nodes);
      if(nodes.collectionByHandle == null) {
        this.products = [];
        // this.toastr.error("Collection not found");
        console.log("Collection not found");
        return;
      }
      nodes = nodes.collectionByHandle.products.edges;
      this.addProducts(nodes);
      // console.log("Products parsed", this.products);
    },(e) => {
      console.log(e);
      this.loadingProducts = false;
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
        description: node.node.descriptionHtml,
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
      class: 'modal-xl'
    };
    this.modalRef = this.modalService.show(ViewProductModalComponent, initialState as ModalOptions);
    this.modalRef.content.product = product;
  }
  isInCart(product) {
    return this.cartService.inCart(product);
  }
}
