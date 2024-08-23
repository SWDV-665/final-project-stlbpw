import { Component } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel,
  IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
//import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { HeaderComponent } from '../header/header.component';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonList, IonGrid, IonRow, IonCol,
    IonInput, IonButton, IonLabel, FormsModule, HeaderComponent],
})
export class HomePage {

  _username!: string;
  _password!: string;
  _title!: string;

  constructor(private router: Router,
    private userdataService: UserdataService,
    public alertController: AlertController) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
    
    this._title = "Nutrition Scanner"
  }

  ionViewWillEnter() {
    //clear the fields
    this._username = '';
    this._password = '';
    if (this.userdataService.getLoggedInStatus() == true){
      this.router.navigate(['/user']);
    }
  }


  async login() {
    let success;

    this.userdataService.userLogin(this._username, this._password).subscribe({
      next: (data: any) => {
      success = true;
      this.userdataService.userLoggedIn = true;
      //clear the fields
      this._username = '';
      this._password = '';
      this.router.navigate(['/user']);
    }, 
    error: (error: any) => {
      console.log('Login failed Home Page');
      console.log(error);
      success = false;
      this.userdataService.userLoggedIn = false;
      this._username = '';
      this._password = '';
      if (error.status == 404) {
        this.presentUserAlert();
      }
      else {
        this.presentServerAlert();
      }
    }
  });

    if (!success) {

      return;
    }

  }

  async createUser() {
    //route to create user page
    this.router.navigate(['/create-user']);
  }

  async presentUserAlert() {
    const alert = await this.alertController.create({
      header: 'User Not Found',
      subHeader: 'Invalid Username or Password',
      message: 'Please try again',
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


}
