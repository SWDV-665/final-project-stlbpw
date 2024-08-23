import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AlertController } from '@ionic/angular';
import { NutritionLabel } from './nutrition-label';
import { timeout, map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

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

  getNutritionInfoFromOffServer(barcodeResult: string): Observable<NutritionLabel> {
    let nutritionLabel = new NutritionLabel();
    console.log('Getting Nutrition Info from OFF Server');
    const url = "https://world.openfoodfacts.net/api/v3/product/" + barcodeResult + "?fields=brands,brand_owner,product_name,serving_size,nutriments";
  
    return this.http.get(url).pipe(
      timeout(7000), 
      map(data => {
        let nutritionLabel = new NutritionLabel();
        nutritionLabel.initalize(data);
        return nutritionLabel;
      }),
      catchError(e => {
        console.error(e);
        this.presentAlert(e);
        throw e;
      })
    );
  }
  
}
