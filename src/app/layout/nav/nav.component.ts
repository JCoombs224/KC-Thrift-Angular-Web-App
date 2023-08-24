import { animate, style, transition, trigger } from '@angular/animations';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';

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

  constructor(public router: Router) { }

  ngOnInit() {
    if(this.router.url == '/' || this.router.url == '/#/') {
      this.showHeader = true;
    }
    else {
      this.showHeader = false;
    }

    this.router.events.subscribe((val) => {
      if(this.router.url == '/' || this.router.url == '/#/') {
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
    });
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

}
