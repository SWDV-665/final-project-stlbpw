import { Injectable } from '@angular/core';
import { NutritionLabel } from './nutrition-label';
import { BehaviorSubject } from 'rxjs';
import { User } from './user';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  appUser: User = new User({username: 'test', firstname: 'test', lastname: 'test', email: 'test', age: 0, password: 'test', foodinfo: []});
  // Array of NutritionLabel objects
  totalCalories: number = 0;

  url = "https://nutritionappserver-0e481339925f.herokuapp.com/api/Nutrition/";


  private totalCaloriesSource = new BehaviorSubject<number>(0);
  totalCalories$ = this.totalCaloriesSource.asObservable();


  constructor(private http: HttpClient) { }

  //get the user object from server
  async userLogin(username: string, password: string) {
    const headers = { 'content-type': 'application/json' };
    let postObject = JSON.stringify({ username: username, password: password });
    console.log("POST to Server: ", postObject);

    this.http.post(this.url + "Login", postObject, { 'headers': headers }).subscribe({
      next: (data: any) => {
        console.log("GET from Server: ", data);
        const user = data.user;
        //loop through foodinfo array and create NutritionLabel objects
        let foodinfo: NutritionLabel[] = [];
        for (let i = 0; i < data.foodinfo.length; i++) {
          let food = data.foodinfo[i];
          let nutritionLabel = new NutritionLabel();
          nutritionLabel.initializeFromDB(food);
          foodinfo.push(nutritionLabel);
        }
        let dataObj = { username: user.username, firstname: user.firstname, lastname: user.lastname, email: user.email, age: user.age, password: user.password, foodinfo: foodinfo };
        this.appUser = new User(dataObj);
        this.appUser.setUserId(data._id);
        console.log("User: ", this.appUser);
        //this.logData();
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  public createUserInDB(username: string, firstname: string, lastname: string, email: string, age: number, password: string) {
    const headers = { 'content-type': 'application/json' };
    this.appUser = new User({username: username, firstname: firstname, lastname: lastname, email: email, age: age, password: password, foodinfo: []});
    let postObject = JSON.stringify(this.appUser);
    console.log("POST to Server: ", postObject);

    this.http.post(this.url, postObject, { 'headers': headers }).subscribe({
      next: (data: any) => {
        console.log("POST to Server: ", data);
        this.appUser = new User(data);
        console.log("User: ", this.appUser);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  // Add a NutritionLabel object to the array
  public addNutritionLabel(nutritionLabel: NutritionLabel): void {
    this.appUser.addFoodItem(nutritionLabel);

    const headers = { 'content-type': 'application/json' };
    let postObject = JSON.stringify(this.appUser);
    console.log("PUT to Server: ", postObject);

    this.http.put(this.url, postObject, { 'headers': headers }).subscribe({
      next: (data: any) => {
        console.log("ADD Food Server: ", data);
      },
      error: (e) => {
        console.error(e);
      },
    });


    this.logData();
  }

  // Get the array of NutritionLabel objects
  public getNutritionLabels(): NutritionLabel[] {
    let num = this.getTotalCalories();
    return this.appUser.getFoodList();
  }

  //delete index from array
  public deleteItem(index: number){
    this.appUser.removeFoodItem(index);

    const headers = { 'content-type': 'application/json' };
    let postObject = JSON.stringify(this.appUser);
    console.log("PUT to Server: ", postObject);

    this.http.put(this.url, postObject, { 'headers': headers }).subscribe({
      next: (data: any) => {
        console.log("Delete Food from Server: ", data);
      },
      error: (e) => {
        console.error(e);
      },
    });
  }

  //get Product Name from index
  public getProductName(index: number): string{
    return this.appUser.foodinfo[index].name;
  }

  //get Product URL from index
  public getProductUrl(index: number): string{
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

  // //clear the array
  // public clearHistory(){
  //   this.nutritionLabels = [];
  // }
}
