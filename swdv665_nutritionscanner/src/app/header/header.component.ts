import { Component, Input, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserAdminService } from '../user-admin.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel]
})
export class HeaderComponent  implements OnInit {
  @Input() title: string | undefined;


  constructor(private router: Router,
    private userAdminService: UserAdminService) { 
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  ngOnInit() {}

  goHome() {
    if (this.userAdminService.getLoggedInStatus() == false) {
      console.log('Go Home');
      this.router.navigate(['/home']);
    }
    else {
      console.log('Go to User Page');
      this.router.navigate(['/user']);
    }
  }

  openSettings() {
    console.log('Open Settings');
    //this.router.navigate(['/settings']);
  }

  openProfile() {
    console.log('Open Profile');
    this.router.navigate(['/user-profile']);
  }

}
