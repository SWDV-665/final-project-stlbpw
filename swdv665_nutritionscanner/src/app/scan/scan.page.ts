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
  _scanStatus: number = 0;
  isCancelButtonDisabled = true;
  isSaveButtonDisabled = true;
  nutritionLabel!: NutritionLabel;
  isCardDisabled = true;

  constructor(private router: Router, public photoService: PhotoService,
    private userAdminService: UserAdminService,
    private http: HttpClient,
    public alertController: AlertController,
    private userdataService: UserdataService) {
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

  addPhotoToGallery() {
    this.photoService.addNewToGallery();
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
      const code = await this.photoService.scanBarcode();
      console.log(code);
      this.barcodeResult = this.photoService.getBarcode();
      await this.getNutritionInfoFromOffServer();
    } catch (e) {
      console.log(e);
    }
  }

  saveNutritionData()
  {
    this.userdataService.addNutritionLabel(this.nutritionLabel);
    this.router.navigate(['/history']);
  }

  cancel() {
    this.isCancelButtonDisabled = true;
    this.isSaveButtonDisabled = true;
    this.isCardDisabled = true;
    this.nutritionLabel.valid = false;
  }

  async getNutritionInfoFromOffServer() {
    console.log('Getting Nutrition Info from OFF Server');
    const url = "https://world.openfoodfacts.net/api/v3/product/" + this.barcodeResult + "?fields=brand_owner,product_name,serving_size,nutriments";
    console.log(url);
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.nutritionLabel = new NutritionLabel();
        console.log(data);
        this._scanStatus = data["status"];
        console.log("Scan Status1: " + data["status"]);
        this.nutritionLabel.barcode = data["code"];
        this.nutritionLabel.productUrl = "https://world.openfoodfacts.org/product/"+ data["code"];
        this.nutritionLabel.brand = data["product"]["brand_owner"];
        this.nutritionLabel.name = data["product"]["product_name"];
        this.nutritionLabel.servingSize = data["product"]["serving_size"];
        this.nutritionLabel.calories = data["product"]["nutriments"]["energy-kcal_serving"];
        this.nutritionLabel.totalFat = data["product"]["nutriments"]["fat_serving"];
        this.nutritionLabel.saturatedFat = data["product"]["nutriments"]["saturated-fat_serving"];
        this.nutritionLabel.transFat = data["product"]["nutriments"]["trans-fat_serving"];
        this.nutritionLabel.cholesterol = data["product"]["nutriments"]["cholesterol_serving"] * 1000;
        this.nutritionLabel.sodium = data["product"]["nutriments"]["sodium_serving"] * 1000;
        this.nutritionLabel.totalCarbohydrates = data["product"]["nutriments"]["carbohydrates_serving"];
        this.nutritionLabel.dietaryFiber = data["product"]["nutriments"]["fiber_serving"];
        this.nutritionLabel.totalSugars = data["product"]["nutriments"]["sugars_serving"];
        this.nutritionLabel.addedSugars = data["product"]["nutriments"]["sugars_serving"];
        this.nutritionLabel.protein = data["product"]["nutriments"]["proteins_serving"];
        this.nutritionLabel.vitaminD = data["product"]["nutriments"]["vitamin-d_serving"] * 1000;
        this.nutritionLabel.calcium = data["product"]["nutriments"]["calcium_serving"] * 1000;
        this.nutritionLabel.iron = data["product"]["nutriments"]["iron_serving"] * 1000;
        this.nutritionLabel.potassium = data["product"]["nutriments"]["potassium_serving"] * 1000;
        this.nutritionLabel.valid = true;
        this.nutritionLabel.correctNaN();
        //this.logData(this.nutritionLabel);
        this.isCancelButtonDisabled = false;
        this.isSaveButtonDisabled = false;
        this.isCardDisabled = false;
      },
      error: (e) => {
        console.error(e);
        if (e.status == 404) {
          this.presentAlert();
        }
      },
      complete: () => console.info('complete')
    })

  }



  async TESTgetNutritionInfoFromOffServer() {
    console.log('Getting Nutrition Info from OFF Server');
    const url = "https://world.openfoodfacts.net/api/v3/product/047495112900?fields=brand_owner,product_name,serving_size,nutriments";
    //const url = "https://world.openfoodfacts.net/api/v2/product/0041318225365";
    console.log(url);
    this.http.get(url).subscribe({
      next: (data: any) => {
        this.nutritionLabel = new NutritionLabel();
        console.log(data);
        this._scanStatus = data["status"];
        console.log("Scan Status1: " + data["status"]);
        this.nutritionLabel.barcode = data["code"];
        this.nutritionLabel.productUrl = "https://world.openfoodfacts.org/product/"+ data["code"];
        this.nutritionLabel.brand = data["product"]["brand_owner"];
        this.nutritionLabel.name = data["product"]["product_name"];
        this.nutritionLabel.servingSize = data["product"]["serving_size"];
        this.nutritionLabel.calories = data["product"]["nutriments"]["energy-kcal_serving"];
        this.nutritionLabel.totalFat = data["product"]["nutriments"]["fat_serving"];
        this.nutritionLabel.saturatedFat = data["product"]["nutriments"]["saturated-fat_serving"];
        this.nutritionLabel.transFat = data["product"]["nutriments"]["trans-fat_serving"];
        this.nutritionLabel.cholesterol = data["product"]["nutriments"]["cholesterol_serving"] * 1000;
        this.nutritionLabel.sodium = data["product"]["nutriments"]["sodium_serving"] * 1000;
        this.nutritionLabel.totalCarbohydrates = data["product"]["nutriments"]["carbohydrates_serving"];
        this.nutritionLabel.dietaryFiber = data["product"]["nutriments"]["fiber_serving"];
        this.nutritionLabel.totalSugars = data["product"]["nutriments"]["sugars_serving"];
        this.nutritionLabel.addedSugars = data["product"]["nutriments"]["sugars_serving"];
        this.nutritionLabel.protein = data["product"]["nutriments"]["proteins_serving"];
        this.nutritionLabel.vitaminD = data["product"]["nutriments"]["vitamin-d_serving"] * 1000;
        this.nutritionLabel.calcium = data["product"]["nutriments"]["calcium_serving"] * 1000;
        this.nutritionLabel.iron = data["product"]["nutriments"]["iron_serving"] * 1000;
        this.nutritionLabel.potassium = data["product"]["nutriments"]["potassium_serving"] * 1000;
        //this.logData(this.nutritionLabel);
        this.nutritionLabel.valid = true;
        this.nutritionLabel.correctNaN();
        this.isCancelButtonDisabled = false;
        this.isSaveButtonDisabled = false;
        this.isCardDisabled = false;
      },
      error: (e) => {
        console.error(e);
        if (e.status == 404) {
          this.presentAlert();
        }
      },
      complete: () => console.info('complete')
    })

  }

  logData(nutritionLabel: NutritionLabel) {
    //log each field of the nutrition label
    console.log("Barcode: " + nutritionLabel.barcode);
    console.log("Product URL: " + nutritionLabel.productUrl);
    console.log("Brand: " + nutritionLabel.brand);
    console.log("Name: " + nutritionLabel.name);
    console.log("Serving Size: " + nutritionLabel.servingSize);
    console.log("Calories: " + nutritionLabel.calories);
    console.log("Total Fat: " + nutritionLabel.totalFat);
    console.log("Saturated Fat: " + nutritionLabel.saturatedFat);
    console.log("Trans Fat: " + nutritionLabel.transFat);
    console.log("Cholesterol: " + nutritionLabel.cholesterol);
    console.log("Sodium: " + nutritionLabel.sodium);
    console.log("Total Carbohydrates: " + nutritionLabel.totalCarbohydrates);
    console.log("Dietary Fiber: " + nutritionLabel.dietaryFiber);
    console.log("Total Sugars: " + nutritionLabel.totalSugars);
    console.log("Added Sugars: " + nutritionLabel.addedSugars);
    console.log("Protein: " + nutritionLabel.protein);
    console.log("Vitamin D: " + nutritionLabel.vitaminD);
    console.log("Calcium: " + nutritionLabel.calcium);
    console.log("Iron: " + nutritionLabel.iron);
    console.log("Potassium: " + nutritionLabel.potassium);
  }



}
