export class NutritionLabel {
    brand: string = '';
    name: string = '';
    barcode?: string = '';
    servingSize: string = ''; 
    calories: number = 0; 
    totalFat: number = 0;
    saturatedFat: number = 0;
    transFat: number = 0;
    cholesterol: number = 0;
    sodium: number = 0;
    totalCarbohydrates: number = 0;
    dietaryFiber: number = 0;
    totalSugars: number = 0;
    addedSugars: number = 0;
    protein: number = 0;
    vitaminD: number = 0;
    calcium: number = 0;
    iron: number = 0;
    potassium: number = 0;
    productUrl?: string = '';
    valid: boolean = false;

    constructor() {
        this.brand = 'Brand Name';
        this.name = 'Food Name';
        this.barcode = '';
        this.servingSize = '';
        this.calories = 0;
        this.totalFat = 0;
        this.saturatedFat = 0;
        this.transFat = 0;
        this.cholesterol = 0;
        this.sodium = 0;
        this.totalCarbohydrates = 0;
        this.dietaryFiber = 0;
        this.totalSugars = 0;
        this.addedSugars = 0;
        this.protein = 0;
        this.vitaminD = 0;
        this.calcium = 0;
        this.iron = 0;
        this.potassium = 0;
        this.productUrl = '';
        this.valid = false;
    }

    public correctNaN() {
        if (isNaN(this.calories)) this.calories = 0;
        if (isNaN(this.totalFat)) this.totalFat = 0;
        if (isNaN(this.saturatedFat)) this.saturatedFat = 0;
        if (isNaN(this.transFat)) this.transFat = 0;
        if (isNaN(this.cholesterol)) this.cholesterol = 0;
        if (isNaN(this.sodium)) this.sodium = 0;
        if (isNaN(this.totalCarbohydrates)) this.totalCarbohydrates = 0;
        if (isNaN(this.dietaryFiber)) this.dietaryFiber = 0;
        if (isNaN(this.totalSugars)) this.totalSugars = 0;
        if (isNaN(this.addedSugars)) this.addedSugars = 0;
        if (isNaN(this.protein)) this.protein = 0;
        if (isNaN(this.vitaminD)) this.vitaminD = 0;
        if (isNaN(this.calcium)) this.calcium = 0;
        if (isNaN(this.iron)) this.iron = 0;
        if (isNaN(this.potassium)) this.potassium = 0;
    }
}
