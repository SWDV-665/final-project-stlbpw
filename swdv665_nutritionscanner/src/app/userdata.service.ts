import { Injectable } from '@angular/core';
import { NutritionLabel } from './nutrition-label';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  appUser: User = new User({ username: 'test', firstname: 'test', lastname: 'test', email: 'test', age: 0, password: 'test', foodinfo: [] });
  // Array of NutritionLabel objects
  totalCalories: number = 0;

  url = "https://nutritionappserver-0e481339925f.herokuapp.com/api/Nutrition/";


  private totalCaloriesSource = new BehaviorSubject<number>(0);
  totalCalories$ = this.totalCaloriesSource.asObservable();

  userLoggedIn: boolean = false;


  constructor(private http: HttpClient) { }

  //get the user from server
  userLogin(username: string, password: string): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    let postObject = JSON.stringify({ username: username, password: password });

    return this.http.post(this.url + "Login", postObject, { 'headers': headers }).pipe(
      tap({
        next: (data: any) => {
          const user = data.user;
          //loop through foodinfo array and create NutritionLabel objects
          let foodinfo: NutritionLabel[] = [];
          for (let i = 0; i < data.foodinfo.length; i++) {
            let food = data.foodinfo[i];
            let nutritionLabel = new NutritionLabel();
            nutritionLabel.initializeFromDB(food);
            foodinfo.push(nutritionLabel);
          }
          let dataObj = { username: user.username, firstname: user.firstname, lastname: user.lastname, 
            email: user.email, age: user.age, password: user.password, foodinfo: foodinfo };
          this.appUser = new User(dataObj);
          this.appUser.setUserId(data._id);
        },
        error: (e) => {
          console.error(e);
          console.log("User not found");
        },
      })
    );

  }

  createUserInDB(username: string, firstname: string, lastname: string, email: string, age: number, password: string): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    this.appUser = new User({ username: username, firstname: firstname, lastname: lastname, email: email, age: age, password: password, foodinfo: [] });
    let postObject = JSON.stringify(this.appUser);

    return this.http.post(this.url + "CreateUser", postObject, { 'headers': headers }).pipe(
      tap({
        next: (data: any) => {
          this.appUser = new User(data);
        },
        error: (e) => {
          console.error(e);
        },
      })
    );

  }

  // Add a NutritionLabel to the user
  addNutritionLabel(nutritionLabel: NutritionLabel):  Observable<any> {
    this.appUser.addFoodItem(nutritionLabel);

    const headers = { 'content-type': 'application/json' };
    let postObject = JSON.stringify(this.appUser);

    return this.http.put(this.url, postObject, { 'headers': headers }).pipe(
      tap({
        next: (data: any) => {
        },
        error: (e) => {
          console.error(e);
        },
      })
    );
  }

  // Get the array of NutritionLabel objects
  public getNutritionLabels(): NutritionLabel[] {
    console.log('Print: 3');
    let num = this.getTotalCalories();
    return this.appUser.getFoodList();
  }

  //get the user's foodinfo from the server
  public syncNutritionLabels(): Observable<NutritionLabel[]> {
    var userId = this.appUser.getUserId();
    return this.http.get(this.url + userId).pipe(
      tap({
        next: (data: any) => {
          //loop through foodinfo array and create NutritionLabel objects
          let foodinfo: NutritionLabel[] = [];
          for (let i = 0; i < data.foodinfo.length; i++) {
            let food = data.foodinfo[i];
            let nutritionLabel = new NutritionLabel();
            nutritionLabel.initializeFromDB(food);
            foodinfo.push(nutritionLabel);
          }
          console.log('Print: 1');
          this.appUser.foodinfo = foodinfo;
        },
        error: (e) => {
          console.error(e);
        },
      })
    );
  }


  //delete index from array
  public deleteItem(index: number):  Observable<any> {
    this.appUser.removeFoodItem(index);

    const headers = { 'content-type': 'application/json' };
    let postObject = JSON.stringify(this.appUser);

    return this.http.put(this.url, postObject, { 'headers': headers }).pipe(
      tap({
        next: (data: any) => {
        },
        error: (e) => {
          console.error(e);
        },
      })
    );
    
  }

  //get Product Name from index
  public getProductName(index: number): string {
    return this.appUser.foodinfo[index].name;
  }

  //get Product URL from index
  public getProductUrl(index: number): string {
    return this.appUser.foodinfo[index].productUrl;
  }

  getTotalCalories(): number {
    this.totalCalories = 0;
    const nutritionLabels: NutritionLabel[] = this.appUser.getFoodList();

    for (let i = 0; i < nutritionLabels.length; i++) {
      this.totalCalories += nutritionLabels[i].calories;
    }

    this.updateTotalCalories(this.totalCalories);
    return this.totalCalories;
  }

  updateTotalCalories(newTotal: number) {
    this.totalCaloriesSource.next(newTotal);
  }

  logData() {
    //log JSON data to console
    console.log(JSON.stringify(this.appUser));
  }

  public logout(): boolean {
    console.log('Logout');
    this.userLoggedIn = false;
    return this.userLoggedIn;
  }

  public getLoggedInStatus(): boolean {
    return this.userLoggedIn;
  }

  public getUsername(): string {
    return this.appUser.username;
  }
}
