import { Component, Input, OnInit } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText,
  IonList, IonItem, IonInput, IonButton, IonLabel, IonFooter, IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router, NavigationEnd } from '@angular/router';
import { UserAdminService } from '../user-admin.service';
import { UserdataService } from '../userdata.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem,
    IonInput, IonButton, IonLabel, IonFooter, IonGrid, IonRow, IonCol, IonText]
})
export class FooterComponent  implements OnInit {
  
  totalCalories: number = 0;

  constructor(private userdataService: UserdataService,
    private router: Router ) { }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.totalCalories = this.userdataService.getTotalCalories();
      }
    });
  }

  ngOnDestroy() {
    this.router.events.subscribe().unsubscribe();
  }

}
