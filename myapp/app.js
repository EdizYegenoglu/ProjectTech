// imports
const express = require('express');
const slug = require('slug');
const app = express();
const port = 3000;
const path = require('path');


const bodyParser = require('body-parser');

app.use(bodyParser());

// static files
app.use(express.static(`${__dirname}static`));
app.use('/static', express.static(path.join(__dirname, '/static')));

// set views
app.set('views', './views');
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index')
}); 



app.post('/results', (req, res) => {
    const subject = req.body.subject
    // res.end(JSON.stringify(req.body));
    res.render('results', {
        data: {
          searchSubject: subject,
          searchResults: ['albert', 'bert']
        },
      });
});

// app.post('/results', function (req, res) {
//     req.body object has your form values
//     console.log(req.body.userQuery);
//   });

// listen on port 3000
app.listen(port, () => {
  console.log('example app listening at http://localhost:3000');
});
