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
  async function connectDB() {
    //get URI form env file
    const uri = process.env.ATLAS_URI
    //make connection to DB
    const options = { useUnifiedTopology: true };
    const client = new MongoClient(uri, options)
    await client.connect();
    db = await client.db(process.env.ATLAS_URI)
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
    let subject= {}
    subject = await db.collection('subject').find({});
      res.render('index', {
        data: { searchSubject: subject }
    });
  });

  app.post("/results", async (req, res) => {
    const subject = {}
    subject = await db.collection('subject').find({});
    const searchSubject = subject.filter(function (subject) {
      return subject = (req.body.subject)
    });
  });
};

app.get('/', (req, res) => {
  res.render('index')
}); 



// app.post('/results', (req, res) => {
//     const subject = req.body.subject
//     res.render('results', {
//         data: {
//           searchSubject: subject,
//           searchResults: ['albert', 'bert']
//         },
//       });
// });

// listen on port 3000
app.listen(port, () => {
  console.log('example app listening at http://localhost:3000');
});
