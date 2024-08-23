import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon,
  IonList, IonItem, IonInput, IonButton, IonLabel, IonFab, IonFabButton,
  IonGrid, IonRow, IonCol, IonImg, IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
  IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { PhotoService } from '../photo.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NutritionLabel } from '../nutrition-label';
import { UserdataService } from '../userdata.service';
import { Platform } from '@ionic/angular';
import { OffdataService } from '../offdata.service';

@Component({
  selector: 'app-scan',
  templateUrl: './scan.page.html',
  styleUrls: ['./scan.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon, IonList, IonItem,
    IonInput, IonButton, IonLabel, IonFab, IonFabButton, IonGrid, IonRow, IonCol, IonImg,
    IonText, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonCardSubtitle,
    IonNote,
    CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class ScanPage implements OnInit {

  public barcodeResult?: string;
  _username!: string;
  _title!: string;
  isCancelButtonDisabled = true;
  isSaveButtonDisabled = true;
  nutritionLabel!: NutritionLabel;
  isCardDisabled = true;

  constructor(private router: Router, public photoService: PhotoService,
    private http: HttpClient,
    public alertController: AlertController,
    private userdataService: UserdataService,
    private platform: Platform,
    private offdataService: OffdataService) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
    this.nutritionLabel = new NutritionLabel();
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.userdataService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = this.userdataService.getUsername() + "'s Scanner";
      //capitalize first letter of username
      this._title = this._title.charAt(0).toUpperCase() + this._title.slice(1);
      this.nutritionLabel = new NutritionLabel();
      this.isCancelButtonDisabled = true;
      this.isSaveButtonDisabled = true;
      this.isCardDisabled = true;
    }
  }

  ionViewDidEnter() {
    if (this.userdataService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this.startScan();
    }
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Invalid Barcode',
      subHeader: 'The barcode you scanned is not valid',
      message: 'Please try scanning a different barcode',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentServerAlert() {
    const alert = await this.alertController.create({
      header: 'Server Error',
      subHeader: 'Problem with server',
      message: 'Please try again',
      buttons: ['OK']
    });

    await alert.present();
  }

  async startScan() {
    try {
      if (this.platform.is('mobile')) {
        console.log('Scanning Barcode Mobile');
        //print what platform is being used
        console.log('Platform: ' + this.platform.platforms());
        const code = await this.photoService.scanBarcode();
        console.log(code);
        this.barcodeResult = this.photoService.getBarcode();
      }
      else {
        console.log('Scanning Barcode Browser');
        //print what platform is being used
        console.log('Platforms: ' + this.platform.platforms());
        this.barcodeResult = "047495112900";
      }
      this.offdataService.getNutritionInfoFromOffServer(this.barcodeResult).subscribe((data: NutritionLabel) => {
        this.nutritionLabel = data;
        if (!this.nutritionLabel.isValid()) {
          this.presentAlert();
        }
        else {
          this.isCancelButtonDisabled = false;
          this.isSaveButtonDisabled = false;
          this.isCardDisabled = false;
        }
      });
    } catch (e) {
      console.log(e);
    }
  }

  openHistory() {
    this.router.navigate(['/history']);
  }

  saveNutritionData() {
    this.userdataService.addNutritionLabel(this.nutritionLabel).subscribe({
      next: (data: any) => {
        this.router.navigate(['/history']);
      },
      error: (error: any) => {
        console.log('Error saving item');
        this.presentServerAlert();
      }
    });
  }

  cancel() {
    this.isCancelButtonDisabled = true;
    this.isSaveButtonDisabled = true;
    this.isCardDisabled = true;
    this.nutritionLabel.valid = false;
  }
}
