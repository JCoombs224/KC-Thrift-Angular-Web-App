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
    this.tiles.push(this.newTile('assets/pier2.jpg', 'Tile 1', 'This is a tile'));
    this.tiles.push(this.newTile('https://images.unsplash.com/photo-1540221652346-e5dd6b50f3e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Y2xvdGhlc3xlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80',
      'Tile 2',
      'This is a tile'));
    this.tiles.push(this.newTile('https://oldnavy.gap.com/Asset_Archive/ONWeb/content/0029/745/737/assets/230501_12-M5091_G_DP_Shorts.jpg',
      'Tile 3',
      'This is a tile'));
    this.tiles.push(this.newTile('https://www.haydengirls.com/cdn/shop/files/Sub_Bottoms_b47d3850-2aef-449b-81ba-4b1a303f8cf4_600x_crop_center.webp?v=1690579418',
      'Tile 4',
      'This is a tile',
      'rgb(0,0,0)'));
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
