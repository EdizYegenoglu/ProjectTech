// imports 
const express = require('express')
const slug = require('slug')
const app = express()
const port = 3000
// const bodyParser = require('body-parser')

// static files 
app.use(express.static(__dirname + 'static'))


// set views 
app.set('views', './views')
app.set('view engine', 'ejs')



// Page waarop je zoekt naar woord en dat zoekresultaat is 
// app.get('/:userQuery', (req, res) => {
//     res.render('index', {data : {userQuery: req.params.userQuery,
//                                 searchResults : ['Albert', 'Bart', 'Chiara']}})
// })

app.post('/results', function(req, res){
    // req.body object has your form values
    console.log(req.body.userQuery);
 });

app.get('/', (req, res) => {
    // res.render('index', {text: 'this is EJS'})
    // const subject = req.body.subject
    res.render('index', {data : {
        // searchSubject: subject,
                                searchResults : ['Albert', 'Bart', 'Chiara']}})
})












app.get('/about', (req, res) => {
    res.render('about', {text: 'About page'})
})

// app.get('/about', (req, res) => {
//     res.sendFile(__dirname + '/static/about.html')
// })
 

// listen on port 3000 
app.listen(port, () => {
    console.log('example app listening at http://localhost:3000')
})


// errormessage 
app.use((req, res) => {
    // res.status(404).send('404 Not Found')
    res.sendFile(__dirname + '/static/images/404.png')
})




