import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, 
  IonList, IonItem, IonInput, IonButton, IonLabel, IonFab, IonFabButton,
  IonGrid, IonRow, IonCol, IonImg, IonText } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { PhotoService } from '../photo.service';
// FIGURE OUT THE BARCODE SCANNER https://ionic.io/blog/introducing-capacitor-barcode-scanner-plugin, might need to use the old one


@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, 
    IonInput, IonButton, IonLabel, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonImg,
    IonText,
    CommonModule, FormsModule]
})
export class ScanPage implements OnInit {

  public barcodeResult?: string;

  constructor(private router: Router, public photoService: PhotoService) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  ngOnInit() {
  }

  goHome() {
    console.log('Go Home');
    this.router.navigate(['/home']);
  }

  openSettings() {
    console.log('Open Settings');
    //this.router.navigate(['/settings']);
  }

  openProfile() {
    console.log('Open Profile');
    //this.router.navigate(['/profile']);
  }

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
  }

  async startScan() {
    try {
      const code = await this.photoService.scanBarcode();
      console.log(code);
      this.barcodeResult = code;
    } catch (e) {
      console.log(e);
    }
  }


}
