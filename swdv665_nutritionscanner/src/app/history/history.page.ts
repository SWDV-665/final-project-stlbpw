import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon, IonList, IonItem,
  IonInput, IonButton, IonLabel, IonItemSliding, IonItemOption, IonItemOptions, IonGrid, IonRow, IonCol,
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserdataService } from '../userdata.service';
import { NutritionLabel } from '../nutrition-label';
import { pencil, trash, share } from 'ionicons/icons';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonItemSliding,
    IonInput, IonButton, IonLabel, IonItemOption, IonItemOptions, IonGrid, IonRow, IonCol,
    CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class HistoryPage implements OnInit {

  _username!: string;
  _title!: string;

  //local array to store the history
  nutritionLabels: NutritionLabel[] = [];

  constructor(private router: Router,
    private userdataService: UserdataService,
    private location: Location,
    public toastController: ToastController,
    public alertController: AlertController) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
    addIcons({ pencil, trash, share });

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.userdataService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = this.userdataService.getUsername() + "'s History";
      //capitalize first letter of username
      this._title = this._title.charAt(0).toUpperCase() + this._title.slice(1);
      this.getNutritionData();
    }
  }

  getNutritionData() {
    //get the nutrition labels from the server
    this.userdataService.syncNutritionLabels().subscribe({
      next: (data: any) => {
        console.log('Print: 2');
        this.nutritionLabels = this.userdataService.getNutritionLabels();
      },
      error: (error: any) => {
        console.log('Error syncing nutrition labels');
      }
    });
  }

  deleteItem(index: number) {

    var productName = this.userdataService.getProductName(index);

    this.userdataService.deleteItem(index).subscribe({
      next: (data: any) => {
        this.presentToast(productName, 'Deleted', 'bottom');
        this.getNutritionData();
      },
      error: (error: any) => {
        console.log('Error deleting item');
        this.presentServerAlert();
      }
    });

  }

  backToCallingPage() {
    this.location.back();
  }

  toScanner() {
    this.router.navigate(['/scan']);
  }

  async shareItem(index: number, slider: IonItemSliding) {
    if (index > -1) {
      //find food item in array
      let name = this.userdataService.getProductName(index);
      let url = this.userdataService.getProductUrl(index);
      this.presentToast(name, 'Shared', 'bottom');

      slider.close();

      //using capacitor share plugin
      const title: string = 'Sharing Food Item';
      const text: string = name + '\n' + url;

      await Share.share({
        title: title,
        text: text,
      });

    }
  }

  async presentToast(name: string, action: string, position: 'top' | 'middle' | 'bottom') {

    try {
      const toast = await this.toastController.create({
        message: name + ' - ' + action,
        duration: 1500,
        position: position

      });

      await toast.present();

    } catch (error) {
      console.error('Error presenting toast: ', error);
    }
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

}
