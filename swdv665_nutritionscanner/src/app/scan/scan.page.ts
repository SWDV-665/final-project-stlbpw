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
// FIGURE OUT THE BARCODE SCANNER https://ionic.io/blog/introducing-capacitor-barcode-scanner-plugin, might need to use the old one
import { UserAdminService } from '../user-admin.service';
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
    private userAdminService: UserAdminService,
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
    console.log('ionViewWillEnter Scan Page');
    if (this.userAdminService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = this.userAdminService.getUsername() + "'s Scanner";
      this.nutritionLabel = new NutritionLabel();
      this.isCancelButtonDisabled = true;
      this.isSaveButtonDisabled = true;
      this.isCardDisabled = true;
      console.log(this._username);
    }
  }

  ionViewDidEnter() {
    if (this.userAdminService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      console.log('ionViewDidEnter Scan Page');
      this.startScan();
    }
  }

  async presentAlert() {
    //this.nutritionLabel.servingSize = "Invalid Barcode";
    const alert = await this.alertController.create({
      header: 'Invalid Barcode',
      subHeader: 'The barcode you scanned is not valid',
      message: 'Please try scanning a different barcode',
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
      //this.nutritionLabel = new NutritionLabel();
      this.nutritionLabel = await this.offdataService.getNutritionInfoFromOffServer(this.barcodeResult);
      if (!this.nutritionLabel.isValid()) {
        this.presentAlert();
      }
      else {
        this.isCancelButtonDisabled = false;
        this.isSaveButtonDisabled = false;
        this.isCardDisabled = false;
      }
 
    } catch (e) {
      console.log(e);
    }
  }

  openHistory() {
    this.router.navigate(['/history']);
  }

  saveNutritionData() {
    this.userdataService.addNutritionLabel(this.nutritionLabel);
    this.router.navigate(['/history']);
  }

  cancel() {
    this.isCancelButtonDisabled = true;
    this.isSaveButtonDisabled = true;
    this.isCardDisabled = true;
    this.nutritionLabel.valid = false;
  }
}
