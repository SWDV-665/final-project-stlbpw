import { NutritionLabel } from './nutrition-label';

export class User {
    _id!: string;
    username: string;
    firstname: string;
    lastname: string;
    email: string;
    age: number;
    password: string;
    foodinfo: NutritionLabel[];

    constructor({ username, firstname, lastname, email, age, password, foodinfo }:
        { username: string, firstname: string, lastname: string, email: string, age: number, password: string, foodinfo: NutritionLabel[] }) {
        this.username = username;
        this.firstname = firstname;
        this.lastname = lastname;
        this.email = email;
        this.age = age;
        this.password = password;
        this.foodinfo = foodinfo;
    }

    addFoodItem(food: NutritionLabel) {
        this.foodinfo.push(food);
    }

    removeFoodItem(index: number) {
        this.foodinfo.splice(index, 1);
    }

    setUserId(id: string) {
        this._id = id;
    }

    getUserId() {
        return this._id;
    }

    getFoodList() {
        return this.foodinfo;
    }

    //use this one
    toJSON() {
        //if this._id is undefined, return JSON without _id
        if (this._id === undefined) {
            return {
                user: {
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    age: this.age,
                    password: this.password
                },
                foodinfo: this.foodinfo.map(food => food.toJSON())
            };
        }
        else {
            return {
                _id: this._id,
                user: {
                    username: this.username,
                    firstname: this.firstname,
                    lastname: this.lastname,
                    email: this.email,
                    age: this.age,
                    password: this.password
                },
                foodinfo: this.foodinfo.map(food => food.toJSON())
            };
        }
    }

    toObject() {
        return {
            username: this.username,
            firstname: this.firstname,
            lastname: this.lastname,
            email: this.email,
            age: this.age,
            password: this.password,
            foodinfo: this.foodinfo.map(food => food.toObject())
        };
    }
}