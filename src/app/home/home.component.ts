import { Component, OnInit } from '@angular/core';
import {FirebaseImageService} from "../services/firebase-image.service";
import {fadeIn} from "../animations/fade-in.animation";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [fadeIn]
})
export class HomeComponent implements OnInit{

  imgUrlPrefix = 'url(';
  imgUrlSuffix = ')';
  tiles = [];
  isHover = -1;
  instagramPosts = [];

  constructor(private firebaseImageService: FirebaseImageService) {
    this.tiles.push(this.newTile('banner.webp'));
    this.tiles.push(this.newTile('womens_600x600.webp'));
    this.tiles.push(this.newTile('mens_600x600.webp'));
    this.tiles.push(this.newTile('accessories_600x600.webp'));

    for (let t of this.tiles) {
      this.firebaseImageService.getImageURL(t.imgName).subscribe((url) => {
        t.img = url;
      });
    }
   }

  ngOnInit() {}

  newTile(imgName = '', title = '', text = '', rgb = 'rgb(255,255,255)') {
    return {
      imgName: imgName,
      img: '',
      title: title,
      text: text,
      rgb: rgb
    }
  }

}
