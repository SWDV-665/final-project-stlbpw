import { Injectable } from '@angular/core';
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

  constructor() { }

  public async scanBarcode(): Promise<string> {
      this.barcodeResult = (await CapacitorBarcodeScanner.scanBarcode(this.options)).ScanResult;
      this.barcodeResult = this.fixUPCA(this.barcodeResult);
      console.log('Barcode data:', this.barcodeResult);
      return this.barcodeResult;
  }

  public getBarcode(): string {
    return this.barcodeResult;
  }

  //Maybe move this to the back-end server
  private fixUPCA(barcode: string): string {
    //add a 0 to the beginning of the barcode if it is 12 digits long
    if (barcode.length == 12) {
      return "0" + barcode;
    }
    else {
      return barcode;
    }
  }
}
