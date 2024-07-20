import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { FormsModule } from '@angular/forms';
//import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonList, IonInput, IonButton, IonLabel, FormsModule],
})
export class HomePage {

  _username!: string;
  _password!: string;

  constructor(private router: Router) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  login() {
    console.log('Login');
    console.log('Username: ' + this._username);
    console.log('Password: ' + this._password);

    //clear the fields
    this._username = '';
    this._password = '';

    this.router.navigate(['/user']);
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
}
