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
import { UserAdminService } from '../user-admin.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserdataService } from '../userdata.service';
import { NutritionLabel } from '../nutrition-label';
import { pencil, trash, share } from 'ionicons/icons';
import { Location } from '@angular/common';
import { ToastController } from '@ionic/angular';
import { Share } from '@capacitor/share';

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
    private userAdminService: UserAdminService,
    private userdataService: UserdataService,
    private location: Location,
    public toastController: ToastController) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
    addIcons({ pencil, trash, share });

  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter History Page');
    if (this.userAdminService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = this.userAdminService.getUsername() + "'s History";
      //populate local array with data from the service
      this.nutritionLabels = this.userdataService.getNutritionLabels();
      console.log(this._username);
    }
  }

  dummyAction() {

  }

  deleteItem(index: number) {
    console.log('Delete Item');
    this.presentToast(this.userdataService.getProductName(index),'Deleted', 'bottom');
    this.userdataService.deleteItem(index);
    this.nutritionLabels = this.userdataService.getNutritionLabels();

 }

  backToCallingPage() {
    console.log('Back to calling page');
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

      //using capacitor share plugin
      const title: string = 'Sharing Food Item';
      const text: string = name + '\n' + url;

      await Share.share({
        title: title,
        text: text,
      });

      slider.close();
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

}
