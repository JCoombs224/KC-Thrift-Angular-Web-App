import { Component, OnInit } from '@angular/core';
import {BsModalRef} from "ngx-bootstrap/modal";
import {ToastrService} from "ngx-toastr";
import {FirebaseImageService} from "../../services/firebase-image.service";
import {finalize} from "rxjs";

@Component({
  selector: 'app-upload-img-modal',
  templateUrl: 'upload-img-modal.component.html',
})
export class UploadImgModalComponent implements OnInit {

  modalRef: BsModalRef;
  imgName;
  imgData; // used for preview
  file;
  fileType = '';

  constructor(public bsModalRef: BsModalRef,
              private firebaseImageService: FirebaseImageService,
              private toastr: ToastrService) {}

  ngOnInit() {}

  public cancel() {
    this.bsModalRef.hide();
  }

  onFileSelected(event) {
    const file: File = event.target.files[0];
    this.file = file;
    this.fileType = file.type;
    // turn image into blob
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      this.imgData = reader.result;
    }
  }

  public upload() {
    const imgName = this.imgName + '.' + this.fileType.split('/')[1];
    this.firebaseImageService.uploadImage(imgName, this.file).pipe(
      finalize(() => {
        this.toastr.success("It may take a few moments for changes to take effect. You will need to refresh the page to see the changes.", "Image uploaded!");
        this.bsModalRef.hide();
      })
    ).subscribe();
  }


}
