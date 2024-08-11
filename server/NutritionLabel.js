class User {
    constructor({username, firstname, lastname, email, age, password}) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.password = password;
    }

    toMongoDB() {
        return {
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            age: this.age,
            password: this.password
        };
    }
}

class FoodInfo {
    constructor({code, date, brand, name, barcode, servingSize, calories, totalFat, saturatedFat, transFat, cholesterol, sodium, 
        totalCarbohydrates, dietaryFiber, totalSugars, addedSugars, protein, vitaminD, calcium, iron, potassium, productUrl}) {
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
    }

    toMongoDB() {
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

module.exports = {
    User,
    FoodInfo
};



/*

{
    "_id": "66b1780517808f66deff1c72",
    "user":{
        "username": "johndoe45",
        "firstname": "John",
        "lastname": "Doe",
        "email": "john@example.com",
        "age": 44,
        "password": "12345"
    }
    ,
    "foodinfo": [
        {
        "code": "1234567890123",
        "date": "2024-08-05T00:00:00Z",
        "brand": "Dummy Brand",
        "name": "Dummy Product",
        "barcode": "1234567890123",
        "servingSize": "100g",
        "calories": 200,
        "totalFat": 10,
        "saturatedFat": 3,
        "transFat": 0,
        "cholesterol": 0,
        "sodium": 150,
        "totalCarbohydrates": 20,
        "dietaryFiber": 5,
        "totalSugars": 10,
        "addedSugars": 5,
        "protein": 10,
        "vitaminD": 0,
        "calcium": 100,
        "iron": 2,
        "potassium": 300,
        "productUrl": "https://dummywebsite.com/dummyproduct"
        },
        {
        "code": "1234567890987",
        "date": "2024-08-05T00:00:00Z",
        "brand": "Dummy Brand",
        "name": "Dummy Product",
        "barcode": "1234567890123",
        "servingSize": "100g",
        "calories": 200,
        "totalFat": 10,
        "saturatedFat": 3,
        "transFat": 0,
        "cholesterol": 0,
        "sodium": 150,
        "totalCarbohydrates": 20,
        "dietaryFiber": 5,
        "totalSugars": 10,
        "addedSugars": 5,
        "protein": 10,
        "vitaminD": 0,
        "calcium": 100,
        "iron": 2,
        "potassium": 300,
        "productUrl": "https://dummywebsite.com/dummyproduct"
        }
    ]
}
*/