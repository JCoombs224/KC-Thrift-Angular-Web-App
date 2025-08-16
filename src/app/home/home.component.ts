import { Component, OnInit } from '@angular/core';
import {FirebaseImageService} from "../services/firebase-image.service";
import {fadeIn} from "../animations/fade-in.animation";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {UploadImgModalComponent} from "../layout/modals/upload-img-modal.component";
import {ToastrService} from "ngx-toastr";
import { Meta, Title } from '@angular/platform-browser';

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
  isLoggedIn: Observable<boolean> = this.authService.user$;
  modalRef: BsModalRef;
  screenWidth = screen.availWidth;

  constructor(private firebaseImageService: FirebaseImageService,
              private authService: AuthService,
              private modalService: BsModalService,
              private toastr: ToastrService,
              private meta: Meta,
              private title: Title) {

    if(this.screenWidth < 600) {
      this.tiles.push(this.newTile('banner_600x600.webp'));
      this.tiles.push(this.newTile('womens_400x400.webp'));
      this.tiles.push(this.newTile('mens_400x400.webp'));
      this.tiles.push(this.newTile('accessories_400x400.webp'));
    }
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

  ngOnInit() {
    (window as any).instgrm.Embeds.process();
    this.title.setTitle("Kit N Caboodle Thrift Store | Oceanside, CA");
    this.meta.addTag({
      name: 'description',
      content: "Kit N Caboodle Thrift Store Boutique, Oceanside, CA. Shop a wide selection of vintage clothing online or come to our store for even better deals!"
    });
  }

  newTile(imgName = '', title = '', text = '', rgb = 'rgb(255,255,255)') {
    return {
      imgName: imgName,
      img: '',
      title: title,
      text: text,
      rgb: rgb
    }
  }

  // Open upload image modal
  onUploadButtonClick(i) {
    if (!this.authService.isLoggedIn) {
      this.toastr.error("Unauthorized action");
      return;
    }
    const imgName = this.tiles[i].imgName.replace('_600x600', '').replace('.webp', '');
    const initialState = {
      initialState: {
        imgName
      },
      title: 'modal',
      class: 'modal-lg'
    };
    this.modalRef = this.modalService.show(UploadImgModalComponent, initialState as ModalOptions);
    this.modalRef.content.imgName = imgName;
    // this.firebaseImageService.uploadImage(imgName);
  }

  protected readonly faEdit = faEdit;
}
