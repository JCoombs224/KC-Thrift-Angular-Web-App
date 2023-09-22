import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faInstagram, faFacebook, faYelp } from '@fortawesome/free-brands-svg-icons';

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

  protected readonly faInstagram = faInstagram;
  protected readonly faFacebook = faFacebook;
  protected readonly faYelp = faYelp;
}
