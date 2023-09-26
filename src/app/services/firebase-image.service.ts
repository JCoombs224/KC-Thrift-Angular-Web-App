import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {AngularFireStorage} from "@angular/fire/compat/storage";

@Injectable({
  providedIn: 'root'
})
export class FirebaseImageService {

  readonly IMAGE_URL_PREFIX = 'gs://kc-thrift/';
  readonly IMAGE_PATH_PREFIX = '/kc-thrift/';

  constructor(private storage: AngularFireStorage) {}

  /**
   * Get the download URL of an image.
   * @param imageName - The path of the image in the Firebase storage bucket.
   * @returns Observable of the download URL.
   */
  getImageURL(imageName: string): Observable<string> {
    const ref = this.storage.refFromURL(this.IMAGE_URL_PREFIX+imageName);
    return ref.getDownloadURL();
  }

  /**
   * Upload an image to Firebase sto  rage.
   * @param imageName - The path to save the image in the Firebase storage bucket.
   * @param data - The image file or blob data.
   * @returns Observable of the upload task snapshot.
   */
  uploadImage(imageName: string, data: any) {
    const fileRef = this.storage.refFromURL(this.IMAGE_URL_PREFIX+imageName);
    const ref = fileRef.put(data);
    return ref.snapshotChanges() as any;
  }

  // Additional methods as needed...
}
