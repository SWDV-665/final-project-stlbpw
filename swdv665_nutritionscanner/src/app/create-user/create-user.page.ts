import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent, IonHeader, IonTitle, IonToolbar, IonIcon, IonList, IonItem, IonInput, IonButton, IonLabel,
  IonGrid, IonRow, IonCol
} from '@ionic/angular/standalone';
import { HeaderComponent } from '../header/header.component';
import { AlertController } from '@ionic/angular';
import { UserdataService } from '../userdata.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.page.html',
  styleUrls: ['./create-user.page.scss'],
  standalone: true,
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonList, IonGrid, IonRow, IonCol,
    IonInput, IonButton, IonLabel, FormsModule, HeaderComponent],
})
export class CreateUserPage implements OnInit {


  _username!: string;
  _firstname!: string;
  _lastname!: string;
  _email!: string;
  _age!: number;
  _password!: string;
  _confirmPassword!: string;

  _title!: string;

  constructor(private alertController: AlertController,
    private userdataService: UserdataService,
    private router: Router) {
    this._title = "Create User";
  }

  ionViewDidLeave() {
    //clear the fields
    this._username = '';
    this._firstname = '';
    this._lastname = '';
    this._email = '';
    this._age = 0;
    this._password = '';
    this._confirmPassword = '';
  }

  ngOnInit(): void {
    // Initialization code here
  }

  createUser() {

    if (this._password != this._confirmPassword) {
      //clear the fields
      this._username = '';
      this._firstname = '';
      this._lastname = '';
      this._email = '';
      this._age = 0;
      this._password = '';
      this._confirmPassword = '';

      this.presentPwAlert();
      return;
    }

    this.userdataService.createUserInDB(this._username, this._firstname, this._lastname, this._email, 0, this._password)
      .subscribe((data: any) => {
        this.userdataService.userLogin(this._username, this._password).subscribe((data: any) => {
          console.log('Create User successful');
          this.userdataService.userLoggedIn = true;
          //clear the fields
          this._username = '';
          this._firstname = '';
          this._lastname = '';
          this._email = '';
          this._age = 0;
          this._password = '';
          this._confirmPassword = '';
          this.router.navigate(['/user']);
        });
      }, (error: any) => {
        console.log(error);
        console.log('Create User failed');
        this.userdataService.userLoggedIn = false;

        if (error.status == 409) {
          this.presentDupAlert();
        }
        else {
          this.presentServerAlert();
        }
      });

  }

  async presentPwAlert() {
    //this.nutritionLabel.servingSize = "Invalid Barcode";
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: 'Password and Confirm Password do not match',
      message: 'Please try again',
      buttons: ['OK']
    });

    await alert.present();
  }

  async presentDupAlert() {
    //this.nutritionLabel.servingSize = "Invalid Barcode";
    const alert = await this.alertController.create({
      header: 'ERROR',
      subHeader: 'Username or Email Already Exists',
      message: 'Please try again',
      buttons: ['OK']
    });

    await alert.present();
  }

  
  async presentServerAlert() {
    //this.nutritionLabel.servingSize = "Invalid Barcode";
    const alert = await this.alertController.create({
      header: 'Server Error',
      subHeader: 'Problem with server',
      message: 'Please try again',
      buttons: ['OK']
    });

    await alert.present();
  }

}
