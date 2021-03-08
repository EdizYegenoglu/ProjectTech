// imports
const express = require('express');
const slug = require('slug');
const app = express();
const port = 4000;
const path = require('path');
const bodyParser = require('body-parser');
const dotenv = require("dotenv").config();
const { MongoClient } = require('mongodb');

// static files
app.use(express.static(`${__dirname}static`));
app.use('/static', express.static(path.join(__dirname, '/static')));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

let db = null;

async function connectDB() {
    //get URI form env file
    const uri = process.env.DB_URI 
    //make connection to DB
    const options = { useUnifiedTopology: true };
    const client = new MongoClient(uri, options)
    await client.connect();
    db = await client.db(process.env.DB_NAME) 
  }
  connectDB(); 
    try {
      console.log('We have made a connection to Mongo!')
    }   
    catch (error) {
      console.log(error)
    }

  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  })); 

  app.get("/", async (req, res) => {
    let Accounts= {}  
    Accounts = await db.collection('Accounts').find({}).toArray();
    res.render('index', {
      results: 0
    })
  }); 


  app.get("/history", async (req, res) => {
    let searchHistory= {}
    searchHistory = await db.collection('searchHistory').find({}).toArray();
    const historyItem = searchHistory.filter(function(searchHistory) {
      return searchHistory.subject.includes(req.body.subject)
    })
  res.render('history', {
    // history: res,
    historyItem: historyItem,
  })
})


  app.post("/results", async (req, res) => {
    Accounts = await db.collection('Accounts').find({}).toArray();

    const searched = (req.body.subject)
    const filteredSubject = Accounts.filter(function (Accounts) {
      return Accounts.subject.includes(req.body.subject)
    });
  res.render('results', { 
    results: filteredSubject.length, 
    searchSubject: searched,
    list: filteredSubject      
  }); 



  app.post("/history", async (req, res) => {

        // toevoegen van gezochte onderwerp naar database 
        const searchHistory = db.collection('searchHistory');
        searchHistory.insertOne( {subject: req.body.subject} )
  });
});


//404
app.use((req, res) => {
  res.status(404).send("this page does not exist.");
});

// listen on port 4000
app.listen(port, () => {
  console.log('example app listening at http://localhost:4000');
});