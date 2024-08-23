import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.page.html',
  styleUrls: ['./user.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonGrid, IonRow, IonCol,
    IonList, IonInput, IonButton, IonLabel, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class UserPage implements OnInit {

  _username!: string;
  _title!: string;

  constructor(private router: Router,
    private userdataService: UserdataService) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {

    if (!this.userdataService.getLoggedInStatus()) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      var username = this.userdataService.getUsername();
      //capitalize first letter of username
      username = username.charAt(0).toUpperCase() + username.slice(1);
      this._title = "Welcome " + username;

      let num = this.userdataService.getTotalCalories();
    }
  }

  openScan() {
    this.router.navigate(['/scan']);
  }

  openHistory() {
    this.router.navigate(['/history']);
  }

}
