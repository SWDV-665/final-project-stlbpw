
const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
var cors = require('cors');
const { User, FoodInfo } = require('./NutritionLabel');

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

const port = 3665;
// const privateKey = fs.readFileSync('./ssl/key.pem');
// const certificate = fs.readFileSync('./ssl/cert.pem');

var db;
var dbCollection;

const uri = "mongodb+srv://brucepwilhelm:<PASSWORD>@nutritionapp.ivueb.mongodb.net/?retryWrites=true&w=majority&appName=NutritionApp";
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
      console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
      console.dir(err);
    }
}
run();

// var mongoPort = 27017;
// const url = `mongodb://localhost:${mongoPort}/NutritionAppDB`;

// MongoClient.connect(url)
//     .then(function (client) {
//         console.log(`Connected successfully to MongoDB server on port ${mongoPort}`);
//         db = client.db('NutritionAppDB');``
//         dbCollection = db.collection('NutritionAppCollection');

//     })
//     .catch(function (err) {
//         console.error('Error connecting to MongoDB server:', err);
//     });


//get all items from the database
app.get('/api/Nutrition', (req, res) => {
    dbCollection.find({}).sort({lastModified: -1}).toArray()
        .then(function (docs) {
            res.json(docs);
            console.log("returning all items");
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });
});

//get all items from the database
app.get('/api/Nutrition/Latest', (req, res) => {
    dbCollection.find().sort({lastModified: -1}).limit(1).toArray()
        .then(function (docs) {
            res.json(docs);
        })
        .catch(function (err) {
            console.error('Error getting documents from collection:', err);
            res.status(500).send('Error getting documents from collection');
        });
});

//create item in the database
app.post('/api/Nutrition', (req, res) => {
    console.log(req.body);

    const user = new User(req.body.user);
    const foodinfo = req.body.foodinfo.map(food => new FoodInfo(food));
    const dataToInsert = {
        user: user.toMongoDB(),
        foodinfo: foodinfo.map(food => food.toMongoDB())
    };

    dbCollection.insertOne(dataToInsert)
        .then(result => {
            console.log(`Successfully inserted item with _id: ${result.insertedId}`)
            res.status(200).json({message: `Successfully inserted item with _id: ${result.insertedId}`});
        })
        .catch(err => {
            console.error(`Failed to insert item: ${err}`)
            res.status(500).send('Failed to insert item');
        });

    //res.status(200).json({message: `Successfully Called`});
});

//create item in the database
app.post('/api/Nutrition/Login', (req, res) => {
    console.log(req.body);

    const username = req.body.username;
    const password = req.body.password;

    console.log(username);
    console.log(password);

    //find _id of the user
    dbCollection.find({ "user.username": username, "user.password": password }).toArray()
        .then(function (docs) {
            if (docs.length > 0) {
                res.status(200).json(docs[0]);
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

//update item quantity in the database by id
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
                console.log(`Successfully updated item id: ${userId}`)
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

//delete item from the database by id
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

// https.createServer({
//     key: privateKey,
//     cert: certificate
//   }, app).listen(port, () => {
//     console.log(`Server is listening on port ${port}`);
//   });

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