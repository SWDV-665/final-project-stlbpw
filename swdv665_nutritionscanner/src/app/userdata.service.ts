import { Injectable } from '@angular/core';
import { NutritionLabel } from './nutrition-label';

@Injectable({
  providedIn: 'root'
})
export class UserdataService {

  // Array of NutritionLabel objects
  nutritionLabels: NutritionLabel[] = [];
  totalCalories: number = 0;

  constructor() { }

  // Add a NutritionLabel object to the array
  public addNutritionLabel(nutritionLabel: NutritionLabel): void {
    this.nutritionLabels.push(nutritionLabel);
  }

  // Get the array of NutritionLabel objects
  public getNutritionLabels(): NutritionLabel[] {
    return this.nutritionLabels;
  }

  //delete index from array
  public deleteItem(index: number){
    this.nutritionLabels.splice(index, 1);
  }

  getTotalCalories(): number {
    this.totalCalories = 0;
    for (let i = 0; i < this.nutritionLabels.length; i++) {
      this.totalCalories += this.nutritionLabels[i].calories;
    }
    return this.totalCalories;
  }

  //clear the array
  public clearHistory(){
    this.nutritionLabels = [];
  }
}
