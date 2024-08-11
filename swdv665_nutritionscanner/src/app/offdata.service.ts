import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NutritionLabel } from './nutrition-label';
import { timeout } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OffdataService {

  constructor(private alertController: AlertController,
    private http: HttpClient) { }

  async presentAlert(e: Error) {
    const alert = await this.alertController.create({
      header: 'Error',
      subHeader: e.name,
      message: 'Please try again later',
      buttons: ['OK']
    });

    await alert.present();
  }

  async getNutritionInfoFromOffServer(barcodeResult: string): Promise<NutritionLabel> {
    let nutritionLabel = new NutritionLabel();
    console.log('Getting Nutrition Info from OFF Server');
    const url = "https://world.openfoodfacts.net/api/v3/product/" + barcodeResult + "?fields=brand_owner,product_name,serving_size,nutriments";
    console.log(url);
  
    return new Promise<NutritionLabel>((resolve, reject) => {
      this.http.get(url).pipe(
        timeout(5000) // time in milliseconds
      ).subscribe({
        next: (data: any) => {
          console.log(data);
          nutritionLabel.initalize(data);
          resolve(nutritionLabel);
        },
        error: (e) => {
          console.error(e);
          this.presentAlert(e);
          reject(e);
        }
      });
    });
  }
  
}
