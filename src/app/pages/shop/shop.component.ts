import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopifyService } from 'src/app/services/shopify.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  category = '';
  products = [];

  constructor(private route: ActivatedRoute,
              private shopifyService: ShopifyService) { }

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
        title: node.node.title
      });
    }
  }
}
