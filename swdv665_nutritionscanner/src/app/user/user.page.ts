import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel,
  IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserAdminService } from '../user-admin.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';

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
    private userAdminService: UserAdminService) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  ngOnInit() {

  }

  ionViewWillEnter() {
    console.log('ionViewWillEnter User Page');

    if (!this.userAdminService.getLoggedInStatus()) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = "Welcome " + this.userAdminService.getUsername();
      console.log(this._username);
    }
  }

  openScan() {
    console.log('Open Scan');
    this.router.navigate(['/scan']);
  }

  openHistory() {
    console.log('Open History');
    this.router.navigate(['/history']);
  }

}
