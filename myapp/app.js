// imports
const express = require('express');
const slug = require('slug');
const app = express();
const port = 3000;
const path = require('path');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true}));

// static files
app.use(express.static(`${__dirname}static`));
app.use('/static', express.static(path.join(__dirname, '/static')));


// create data schema 
// const notesSchema = {
//   subject: String
// }

// const Note = MongoClient.model("Note", notesSchema);

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
  // let newNote = new Note({
  //   title: req.body.subject,
  // })
  // newNote.save();
}); 


app.post('/results', (req, res) => {
    const subject = req.body.subject
    res.render('results', {
        data: {
          searchSubject: subject,
          searchResults: ['albert', 'bert']
        },
      });
});

// listen on port 3000
app.listen(port, () => {
  console.log('example app listening at http://localhost:3000');
});
