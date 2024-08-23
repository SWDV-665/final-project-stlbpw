
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
var cors = require('cors');
const { User, FoodInfo } = require('./NutritionLabel');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = 3665;

var db;
var dbCollection;

const uri = "mongodb+srv://brucepwilhelm:SeYIXfylGlnBD0wZ@nutritionapp.ivueb.mongodb.net/?retryWrites=true&w=majority&appName=NutritionApp";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB!");
        db = client.db('NutritionAppDB');
        dbCollection = db.collection('NutritionAppCollection');
    } catch (err) {
        console.dir(err);
    }
}
run();


//get all items from the database
app.get('/api/Nutrition', (req, res) => {
    dbCollection.find({}).sort({ lastModified: -1 }).toArray()
        .then(function (docs) {
            res.json(docs);
            console.log("returning all items");
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });
});

//get data from the database by id 
app.get('/api/Nutrition/:id', (req, res) => {
    var userId = req.params.id;
    var ObjectId = require('mongodb').ObjectId;
    var _userId = new ObjectId(userId);

    dbCollection.find({ _id: _userId }).toArray()
        .then(function (docs) {
            if (docs.length > 0) {
                res.json(docs[0]);
                console.log("returning items for user: " + docs[0].user.username);
            } else {
                res.status(404).send('No items found');
            }
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });
});

//get latest item from the database
app.get('/api/Nutrition/Latest', (req, res) => {
    dbCollection.find().sort({ lastModified: -1 }).limit(1).toArray()
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });
});

//create user in the database
app.post('/api/Nutrition/CreateUser', (req, res) => {
    //console.log(req.body);

    const user = new User(req.body.user);
    const foodinfo = req.body.foodinfo.map(food => new FoodInfo(food));
    const dataToInsert = {
        user: user.toMongoDB(),
        foodinfo: foodinfo.map(food => food.toMongoDB())
    };

    //check to see if username already exists
    dbCollection.find({ $or: [{ "user.username": user.username }, { "user.email": user.email }] }).toArray()
        .then(function (docs) {
            if (docs.length > 0) {
                res.status(409).send('Username or email already exists');
            } else {
                dbCollection.insertOne(dataToInsert)
                    .then(result => {
                        console.log(`Successfully inserted item with _id: ${result.insertedId}`)
                        res.status(200).json({ message: `Successfully inserted item with _id: ${result.insertedId}` });
                    })
                    .catch(err => {
                        console.error(`Failed to insert item: ${err}`)
                        res.status(500).send('Failed to insert item');
                    });
            }
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });


    //res.status(200).json({message: `Successfully Called`});
});

//Login user in the database
app.post('/api/Nutrition/Login', (req, res) => {
    //console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    //console.log(username);
    //console.log(password);

    //find _id of the user
    dbCollection.find({ "user.username": username, "user.password": password }).toArray()
        .then(function (docs) {
            if (docs.length > 0) {
                //return user data
                res.status(200).json(docs[0]);
                console.log("user logged in: " + docs[0].user.username);
                console.log("returning user data for user: " + docs[0].user.username);
            } else {
                res.status(404).send('No user found');
            }
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });


    //res.status(200).json({message: `Successfully Called`});
});

//update user data in the database
app.put('/api/Nutrition', (req, res) => {

    const user = new User(req.body.user);
    const foodinfo = req.body.foodinfo.map(food => new FoodInfo(food));
    let userId = req.body._id;
    let ObjectId = require('mongodb').ObjectId;
    let _userId = new ObjectId(userId);
    const dataToUpdate = {
        user: user.toMongoDB(),
        foodinfo: foodinfo.map(food => food.toMongoDB())
    };

    dbCollection.updateOne({ _id: _userId }, { $set: dataToUpdate })
        .then(result => {
            if (result.matchedCount > 0) {
                console.log(`Successfully updated for: ${user.username}`)
                res.status(200).json({ message: `Successfully updated item with id: ${userId}` });
            } else {
                console.log(`No items matched with id: ${userId}`)
                res.status(404).send(`No items matched with id: ${userId}`);
            }
        })
        .catch(err => {
            console.error(`Failed to update item: ${err}`)
            res.status(500).send('Failed to update item');
        });
});

//delete item from the database by id, this is for a whole user not a food item
app.delete('/api/Nutrition/:id', (req, res) => {
    console.log(req.params.id);
    var userId = req.params.id;
    var ObjectId = require('mongodb').ObjectId;
    var _userId = new ObjectId(userId);
    //console.log(itemid);

    dbCollection.deleteOne({ _id: _userId })
        .then(result => {
            if (result.deletedCount > 0) {
                console.log(`Successfully deleted: ${result.deletedCount}`)
                res.status(200).json({ message: `Successfully deleted: ${result.deletedCount} item` });
            } else {
                console.log(`No items matched with id: ${groceryId}`)
                res.status(404).send(`No items matched with id: ${groceryId}`);
            }
        })
        .catch(err => {
            console.error(`Failed to delete item: ${err}`)
            res.status(500).send('Failed to delete item');
        });
});


//display index.html
app.get('/', (req, res) => {
    res.sendFile(path('public/index.html'));
});


//listen on port
app.listen(process.env.PORT || port, () => {
    console.log(`Server is listening on port ${process.env.PORT || port}`);
});



/*
{
    "_id": "1234567890123",
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

*/