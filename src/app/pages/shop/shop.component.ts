import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  
  category = '';

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    // Subscribe to the route params to get the category
    this.route.params.subscribe(params => {
      this.category = params['category'];
      this.categoryChange();
    });
  }

  categoryChange() {
    // do something here
    console.log(this.category);
  }
}
