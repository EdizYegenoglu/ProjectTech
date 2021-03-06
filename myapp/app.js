// imports
const express = require('express');
const slug = require('slug');
const app = express();
const port = 3000;
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

  app.post("/results", async (req, res) => {
    Accounts = await db.collection('Accounts').find({}).toArray();
    const searched = (req.body.subject)
    const filteredSubject = Accounts.filter(function (Accounts) {
      return Accounts.subject.includes(req.body.subject)
    });
    res.render('results', { 
      results: filteredSubject.length, 
      searchSubject: searched,
      name: filteredSubject.name,
      image: filteredSubject.image
      });
    });

// listen on port 3000
app.listen(port, () => {
  console.log('example app listening at http://localhost:3000');
});
