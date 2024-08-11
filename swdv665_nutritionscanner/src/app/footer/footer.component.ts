import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonText,
  IonList, IonItem, IonInput, IonButton, IonLabel, IonFooter, IonGrid, IonRow, IonCol} from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { personOutline } from 'ionicons/icons';
import { homeOutline } from 'ionicons/icons';
import { settingsOutline } from 'ionicons/icons';
import { Router, NavigationEnd } from '@angular/router';
import { UserAdminService } from '../user-admin.service';
import { UserdataService } from '../userdata.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem,
    IonInput, IonButton, IonLabel, IonFooter, IonGrid, IonRow, IonCol, IonText]
})

export class FooterComponent implements OnInit, OnDestroy {
  totalCalories: number = 0;
  private totalCaloriesSubscription!: Subscription;

  constructor(private userdataService: UserdataService, private router: Router) { }



  ngOnInit() {
    this.totalCaloriesSubscription = this.userdataService.totalCalories$.subscribe(total => {
      this.totalCalories = total;
    });
  }
  
  ngOnDestroy() {
    this.totalCaloriesSubscription.unsubscribe();
  }
}