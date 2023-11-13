import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {faBars, faHardHat, faScrewdriverWrench, faShoppingCart} from "@fortawesome/free-solid-svg-icons";
import {CartService} from "../../services/cart.service";
import {AuthService} from "../../services/auth.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0 }),
            animate('0.5s',
              style({ }))
          ]
        ),
        transition(
          ':leave',
          [
            style({  }),
            animate('0.5s',
              style({ height: 0 }))
          ]
        )
      ]
    )
  ]
})
export class NavComponent implements OnInit {

  showHeader = false;
  headerScrolled = false;
  menuOpen = false;
  showDialog = true;
  isLoggedIn: Observable<boolean> = this.authService.user$;

  constructor(public router: Router,
              public cart: CartService,
              private authService: AuthService) { }

  ngOnInit() {
    if(this.router.url == '/' || this.router.url == '/#/') {
      this.showHeader = true;
    }
    else {
      this.showHeader = false;
    }

    const showDialog = localStorage.getItem('showDialog');
    if(showDialog == 'false') {
      this.showDialog = false;
    }

    this.router.events.subscribe((val) => {
      if((this.router.url == '/' || this.router.url == '/#/')) {
        if(!this.menuOpen) {
          this.showHeader = true;
          if(window.scrollY == 0) {
            document.getElementById('navBrand').classList.remove('in');
            document.getElementById('navbarHeader').classList.remove('out');
          }
        }
      }
      else {
        this.showHeader = false;
        document.getElementById('navBrand').classList.add('in');
        document.getElementById('navbarHeader').classList.add('out');
      }
      this.menuOpen = false;
    });
  }

  logout() {
    this.authService.LogOut();
  }

  @HostListener('window:scroll', ['$event'])
  toggleHeader(event) {
    if(this.showHeader) {
      if(!this.headerScrolled && window.scrollY > 100) {
        this.headerScrolled = true;
        // document.getElementById('navbarHeader').classList.add('out');
        document.getElementById('navBrand').classList.add('in');
        // setTimeout(() => {
        //   window.scroll(0, 1);
        // }, 500);
      }
      else if(this.headerScrolled && window.scrollY <= 100) {
        this.headerScrolled = false;
        document.getElementById('navbarHeader').classList.remove('out');
        document.getElementById('navBrand').classList.remove('in');
      }
    }

  }

  openCart() {
    this.cart.toggleCart(true);
  }

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
    if((this.router.url == '/' || this.router.url == '/#/') && !this.menuOpen) {
      this.showHeader = true;
      if(window.scrollY == 0) {
        document.getElementById('navBrand').classList.remove('in');
        document.getElementById('navbarHeader').classList.remove('out');
      }
    }
    else {
      this.showHeader = false;
      document.getElementById('navBrand').classList.add('in');
      document.getElementById('navbarHeader').classList.add('out');
    }
  }

  // TODO: Remove this function once website is done
  closeDialog() {
    this.showDialog = false;
    localStorage.setItem('showDialog', 'false');
  }

  protected readonly faShoppingCart = faShoppingCart;
  protected readonly faBars = faBars;
  protected readonly faScrewdriverWrench = faScrewdriverWrench;
}
