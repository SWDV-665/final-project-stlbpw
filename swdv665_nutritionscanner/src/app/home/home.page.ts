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
import { UserAdminService } from '../user-admin.service';
import { HeaderComponent } from '../header/header.component';


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
    private userAdminService: UserAdminService){
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
    
    this._title = "Nutrition Scanner"
  }

  async login() {
    console.log('Login');
    console.log('Username: ' + this._username);
    console.log('Password: ' + this._password);

    await this.userAdminService.login(this._username, this._password);

    //clear the fields
    this._username = '';
    this._password = '';


    this.router.navigate(['/user']);
  }


}
