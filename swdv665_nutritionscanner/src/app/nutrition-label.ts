export class NutritionLabel {
    code: string;
    date: string;
    brand: string;
    name: string;
    barcode: string;
    servingSize: string;
    calories: number;
    totalFat: number;
    saturatedFat: number;
    transFat: number;
    cholesterol: number;
    sodium: number;
    totalCarbohydrates: number;
    dietaryFiber: number;
    totalSugars: number;
    addedSugars: number;
    protein: number;
    vitaminD: number;
    calcium: number;
    iron: number;
    potassium: number;
    productUrl: string;
    valid: boolean = false;

    constructor() {
        this.code = '';
        this.date = '';
        this.brand = 'Brand Name';
        this.name = 'Food Name';
        this.barcode = '';
        this.servingSize = '';
        this.calories = -1;
        this.totalFat = -1;
        this.saturatedFat = -1;
        this.transFat = -1;
        this.cholesterol = -1;
        this.sodium = -1;
        this.totalCarbohydrates = -1;
        this.dietaryFiber = -1;
        this.totalSugars = -1;
        this.addedSugars = -1;
        this.protein = -1;
        this.vitaminD = -1;
        this.calcium = -1;
        this.iron = -1;
        this.potassium = -1;
        this.productUrl = '';
        this.valid = false;
    }

    public initalize(data: any): boolean {
        if (data) {
            this.code = data["code"];
            this.barcode = data["code"];
            this.productUrl = "https://world.openfoodfacts.org/product/" + data["code"];
            this.brand = data["product"]["brand_owner"];
            this.name = data["product"]["product_name"];
            this.servingSize = data["product"]["serving_size"];
            this.calories = data["product"]["nutriments"]["energy-kcal_serving"];
            this.totalFat = data["product"]["nutriments"]["fat_serving"];
            this.saturatedFat = data["product"]["nutriments"]["saturated-fat_serving"];
            this.transFat = data["product"]["nutriments"]["trans-fat_serving"];
            this.cholesterol = data["product"]["nutriments"]["cholesterol_serving"] * 1000;
            this.sodium = data["product"]["nutriments"]["sodium_serving"] * 1000;
            this.totalCarbohydrates = data["product"]["nutriments"]["carbohydrates_serving"];
            this.dietaryFiber = data["product"]["nutriments"]["fiber_serving"];
            this.totalSugars = data["product"]["nutriments"]["sugars_serving"];
            this.addedSugars = data["product"]["nutriments"]["sugars_serving"];
            this.protein = data["product"]["nutriments"]["proteins_serving"];
            this.vitaminD = data["product"]["nutriments"]["vitamin-d_serving"] * 1000;
            this.calcium = data["product"]["nutriments"]["calcium_serving"] * 1000;
            this.iron = data["product"]["nutriments"]["iron_serving"] * 1000;
            this.potassium = data["product"]["nutriments"]["potassium_serving"] * 1000;
            return this.validate();
        }
        else {
            return false;
        }
    }

    public initializeFromDB({ code, date, brand, name, barcode, servingSize, calories, totalFat, saturatedFat, transFat,
        cholesterol, sodium, totalCarbohydrates, dietaryFiber, totalSugars, addedSugars, protein, vitaminD,
        calcium, iron, potassium, productUrl }:
        {
            code: string, date: string, brand: string, name: string, barcode: string, servingSize: string, calories: number,
            totalFat: number, saturatedFat: number, transFat: number, cholesterol: number, sodium: number,
            totalCarbohydrates: number, dietaryFiber: number, totalSugars: number, addedSugars: number,
            protein: number, vitaminD: number, calcium: number, iron: number, potassium: number, productUrl: string
        }): boolean {
        this.code = code;
        this.date = date;
        this.brand = brand;
        this.name = name;
        this.barcode = barcode;
        this.servingSize = servingSize;
        this.calories = calories;
        this.totalFat = totalFat;
        this.saturatedFat = saturatedFat;
        this.transFat = transFat;
        this.cholesterol = cholesterol;
        this.sodium = sodium;
        this.totalCarbohydrates = totalCarbohydrates;
        this.dietaryFiber = dietaryFiber;
        this.totalSugars = totalSugars;
        this.addedSugars = addedSugars;
        this.protein = protein;
        this.vitaminD = vitaminD;
        this.calcium = calcium;
        this.iron = iron;
        this.potassium = potassium;
        this.productUrl = productUrl;
        return this.validate();
    }

    public correctNaN() {
        if (isNaN(this.calories)) this.calories = -1;
        if (isNaN(this.totalFat)) this.totalFat = -1;
        if (isNaN(this.saturatedFat)) this.saturatedFat = -1;
        if (isNaN(this.transFat)) this.transFat = -1;
        if (isNaN(this.cholesterol)) this.cholesterol = -1;
        if (isNaN(this.sodium)) this.sodium = -1;
        if (isNaN(this.totalCarbohydrates)) this.totalCarbohydrates = -1;
        if (isNaN(this.dietaryFiber)) this.dietaryFiber = -1;
        if (isNaN(this.totalSugars)) this.totalSugars = -1;
        if (isNaN(this.addedSugars)) this.addedSugars = -1;
        if (isNaN(this.protein)) this.protein = -1;
        if (isNaN(this.vitaminD)) this.vitaminD = -1;
        if (isNaN(this.calcium)) this.calcium = -1;
        if (isNaN(this.iron)) this.iron = -1;
        if (isNaN(this.potassium)) this.potassium = -1;
    }

    public isValid(): boolean {
        return this.valid;
    }

    private validate() {
        if (isNaN(this.calories) && isNaN(this.totalFat) && isNaN(this.totalCarbohydrates) && isNaN(this.protein)) {
            console.log('Calories,Fat,Carbs,Prot is NaN');
            this.valid = false;
            return false;
        }
        else if (this.calories < 0 || this.totalFat < 0 || this.totalCarbohydrates < 0 || this.protein < 0) {
            console.log('Calories,Fat,Carbs,Prot is negative');
            this.valid = false;
            return false;
        }
        else {
            console.log('Calories,Fat,Carbs,Prot is valid');
            this.correctNaN();
            this.valid = true;
            return true;
        }
    }

    logData() {
        //log each field of the nutrition label
        console.log("Barcode: " + this.barcode);
        console.log("Product URL: " + this.productUrl);
        console.log("Brand: " + this.brand);
        console.log("Name: " + this.name);
        console.log("Serving Size: " + this.servingSize);
        console.log("Calories: " + this.calories);
        console.log("Total Fat: " + this.totalFat);
        console.log("Saturated Fat: " + this.saturatedFat);
        console.log("Trans Fat: " + this.transFat);
        console.log("Cholesterol: " + this.cholesterol);
        console.log("Sodium: " + this.sodium);
        console.log("Total Carbohydrates: " + this.totalCarbohydrates);
        console.log("Dietary Fiber: " + this.dietaryFiber);
        console.log("Total Sugars: " + this.totalSugars);
        console.log("Added Sugars: " + this.addedSugars);
        console.log("Protein: " + this.protein);
        console.log("Vitamin D: " + this.vitaminD);
        console.log("Calcium: " + this.calcium);
        console.log("Iron: " + this.iron);
        console.log("Potassium: " + this.potassium);
    }

    toJSON() {
        return {
            code: this.code,
            date: this.date,
            brand: this.brand,
            name: this.name,
            barcode: this.barcode,
            servingSize: this.servingSize,
            calories: this.calories,
            totalFat: this.totalFat,
            saturatedFat: this.saturatedFat,
            transFat: this.transFat,
            cholesterol: this.cholesterol,
            sodium: this.sodium,
            totalCarbohydrates: this.totalCarbohydrates,
            dietaryFiber: this.dietaryFiber,
            totalSugars: this.totalSugars,
            addedSugars: this.addedSugars,
            protein: this.protein,
            vitaminD: this.vitaminD,
            calcium: this.calcium,
            iron: this.iron,
            potassium: this.potassium,
            productUrl: this.productUrl
        };
    }

    toObject() {
        return {
            code: this.code,
            date: this.date,
            brand: this.brand,
            name: this.name,
            barcode: this.barcode,
            servingSize: this.servingSize,
            calories: this.calories,
            totalFat: this.totalFat,
            saturatedFat: this.saturatedFat,
            transFat: this.transFat,
            cholesterol: this.cholesterol,
            sodium: this.sodium,
            totalCarbohydrates: this.totalCarbohydrates,
            dietaryFiber: this.dietaryFiber,
            totalSugars: this.totalSugars,
            addedSugars: this.addedSugars,
            protein: this.protein,
            vitaminD: this.vitaminD,
            calcium: this.calcium,
            iron: this.iron,
            potassium: this.potassium,
            productUrl: this.productUrl
        };
    }

}