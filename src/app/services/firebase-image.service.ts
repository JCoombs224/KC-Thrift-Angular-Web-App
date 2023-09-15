import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseImageService {

  readonly IMAGE_PATH = 'gs://kc-thrift/';

  constructor(private storage: AngularFireStorage) {}

  /**
   * Get the download URL of an image.
   * @param imageName - The path of the image in the Firebase storage bucket.
   * @returns Observable of the download URL.
   */
  getImageURL(imageName: string): Observable<string> {
    const ref = this.storage.refFromURL(this.IMAGE_PATH+imageName);
    return ref.getDownloadURL();
  }

  /**
   * Upload an image to Firebase sto  rage.
   * @param imagePath - The path to save the image in the Firebase storage bucket.
   * @param data - The image file or blob data.
   * @returns Observable of the upload task snapshot.
   */
  uploadImage(imagePath: string, data: any): Observable<any> {
    const ref = this.storage.upload(imagePath, data);
    return ref.snapshotChanges();
  }

  // Additional methods as needed...
}
