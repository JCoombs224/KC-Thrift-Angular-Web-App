import { Component, OnInit } from '@angular/core';
import {fadeIn} from "../animations/fade-in.animation";
import {faBagShopping, faClock, faPhone, faTruck} from "@fortawesome/free-solid-svg-icons";
import {faInstagram} from "@fortawesome/free-brands-svg-icons";

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
  animations: [fadeIn]
})
export class AboutComponent implements OnInit{

  constructor() { }

  ngOnInit() {}

  protected readonly faPhone = faPhone;
  protected readonly faClock = faClock;
  protected readonly faBagShopping = faBagShopping;
  protected readonly faTruck = faTruck;
  protected readonly faInstagram = faInstagram;
}
