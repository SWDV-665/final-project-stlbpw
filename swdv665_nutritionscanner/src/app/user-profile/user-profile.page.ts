import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon, IonList, IonItem,
  IonGrid, IonRow, IonCol, IonInput, IonButton, IonLabel, IonNote
} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon, IonItem, IonList, IonGrid, IonRow, IonCol,
    IonInput, IonButton, IonLabel, IonNote, CommonModule, FormsModule, HeaderComponent, FooterComponent]
})
export class UserProfilePage implements OnInit {

  _username!: string;
  _title!: string;
  userName: string = '';
  email: string = '';
  firstName: string = '';
  lastName: string = '';
  age: number = 0;

  constructor(private router: Router,
    private userdataService: UserdataService) {
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  ngOnInit() {
  }

  ionViewWillEnter() {
    if (this.userdataService.getLoggedInStatus() == false) {
      console.log('Not Logged In');
      this.router.navigate(['/home']);
    }
    else {
      this._title = this.userdataService.getUsername() + "'s Profile";
      //capitalize first letter of username
      this._title = this._title.charAt(0).toUpperCase() + this._title.slice(1);
      this.userName = this.userdataService.appUser.username;
      this.email = this.userdataService.appUser.email;
      this.firstName = this.userdataService.appUser.firstname;
      this.lastName = this.userdataService.appUser.lastname;
      this.age = this.userdataService.appUser.age;
    }
  }

  logout() {
    console.log('Logout');
    this.userdataService.logout();
    this.router.navigate(['/home']);
  }

}
