import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html'
})
export class FooterComponent implements OnInit {

  showHeader = false;
  headerScrolled = false;
  menuOpen = false;

  constructor(public router: Router) { }

  ngOnInit() {

  }

}
