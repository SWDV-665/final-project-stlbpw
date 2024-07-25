import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource, Photo } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';
import { Preferences } from '@capacitor/preferences';
import { CapacitorBarcodeScanner, CapacitorBarcodeScannerOptions, CapacitorBarcodeScannerTypeHintALLOption } from '@capacitor/barcode-scanner';
//https://www.youtube.com/watch?v=nUqiejQi0wM
//https://github.com/Nykz/Capacitor-Barcode-App-in-Ionic-Angular/blob/main/src/app/home/cart/cart.page.ts
//https://ionicnotes.com/blog/barcode-scanner-in-your-ionic-app-using-capacitor



@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  
  public barcodeResult!: string;
  private options: CapacitorBarcodeScannerOptions = {
    scanButton: false,
    scanInstructions: 'Place a barcode inside the rectangle',
    scanOrientation: 3,
    hint: CapacitorBarcodeScannerTypeHintALLOption.ALL
  };

  public photos: UserPhoto[] = [];

  constructor() { }

  public async addNewToGallery() {
    // Take a photo
    const capturedPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100
    });

    this.photos.unshift({
      filepath: "soon...",
      webviewPath: capturedPhoto.webPath!
    });
  }

  public async scanBarcode(): Promise<string> {
      this.barcodeResult = (await CapacitorBarcodeScanner.scanBarcode(this.options)).ScanResult;
      console.log('Barcode data:', this.barcodeResult);
      return this.barcodeResult;
  }
}

export interface UserPhoto {
  filepath: string;
  webviewPath?: string;
}
