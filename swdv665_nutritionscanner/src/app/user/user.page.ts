import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonList, IonInput, IonButton, IonLabel, CommonModule, FormsModule]
})
export class UserPage implements OnInit {

  _username!: string;

  constructor(private router: Router) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
    this._username = 'Bruce';
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

  openScan()
  {
    console.log('Open Scan');
    this.router.navigate(['/scan']);
  }

  openHistory()
  {
    console.log('Open History');
    this.router.navigate(['/history']);
  }

}
