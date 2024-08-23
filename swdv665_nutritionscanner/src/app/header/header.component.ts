import { Component, Input, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router } from '@angular/router';
import { UserdataService } from '../userdata.service';

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
    private userdataService: UserdataService) { 
    addIcons({ personOutline });
    addIcons({ homeOutline });
    addIcons({ settingsOutline });
  }

  ngOnInit() {}

  goHome() {
    if (this.userdataService.getLoggedInStatus() == false) {
      this.router.navigate(['/home']);
    }
    else {
      this.router.navigate(['/user']);
    }
  }

  openSettings() {
    //this.router.navigate(['/settings']);
  }

  openProfile() {
    this.router.navigate(['/user-profile']);
  }

}
