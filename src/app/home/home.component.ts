import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  imgUrlPrefix = 'url(';
  imgUrlSuffix = ')';
  tiles = [];
  isHover = -1;

  constructor() {
    this.tiles.push(this.newTile('assets/banner.png'));
    this.tiles.push(this.newTile('assets/womens.png'));
    this.tiles.push(this.newTile('assets/mens.png'));
    this.tiles.push(this.newTile('assets/accessories.png'));
   }

  ngOnInit() {}

  newTile(img = '', title = '', text = '', rgb = 'rgb(255,255,255)') {
    return {
      img: img,
      title: title,
      text: text,
      rgb: rgb
    }
  }

  mouseEnter(tile) {

  }
  mouseLeave(tile) {

  }
}
