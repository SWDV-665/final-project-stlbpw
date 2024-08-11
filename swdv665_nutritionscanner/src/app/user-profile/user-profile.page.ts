import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonFooter, IonTitle, IonToolbar, IonIcon, IonList, IonItem, 
  IonGrid, IonRow, IonCol, IonInput, IonButton, IonLabel, IonNote } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserAdminService } from '../user-admin.service';
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
    private userAdminService: UserAdminService,
    private userdataService: UserdataService) {
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
      this.userName = this.userdataService.appUser.username;
      this.email = this.userdataService.appUser.email;
      this.firstName = this.userdataService.appUser.firstname;
      this.lastName = this.userdataService.appUser.lastname;
      this.age = this.userdataService.appUser.age;
      console.log(this._username);
    }
  }

  logout() {
    console.log('Logout');
    this.userAdminService.logout();
    this.router.navigate(['/home']);
  }

}
