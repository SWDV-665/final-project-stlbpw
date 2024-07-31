import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, 
  IonGrid, IonRow, IonCol, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserAdminService } from '../user-admin.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonItem, IonList, IonGrid, IonRow, IonCol,
    IonInput, IonButton, IonLabel, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class UserProfilePage implements OnInit {

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
    console.log('ionViewWillEnter User Profile Page');
    if (this.userAdminService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = this.userAdminService.getUsername() + "'s Profile";
      console.log(this._username);
    }
  }

  logout() {
    console.log('Logout');
    this.userAdminService.logout();
    this.router.navigate(['/home']);
  }

}
