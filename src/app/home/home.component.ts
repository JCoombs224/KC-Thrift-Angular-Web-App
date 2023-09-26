import { Component, OnInit } from '@angular/core';
import {FirebaseImageService} from "../services/firebase-image.service";
import {fadeIn} from "../animations/fade-in.animation";
import {Observable} from "rxjs";
import {AuthService} from "../services/auth.service";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import {BsModalRef, BsModalService, ModalOptions} from "ngx-bootstrap/modal";
import {UploadImgModalComponent} from "../layout/modals/upload-img-modal.component";
import {ToastrService} from "ngx-toastr";

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

  constructor(private firebaseImageService: FirebaseImageService,
              private authService: AuthService,
              private modalService: BsModalService,
              private toastr: ToastrService) {

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
