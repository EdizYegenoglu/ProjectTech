// imports 
const express = require('express')
const app = express()
const port = 3000


// static files 
app.use(express.static('static'))
app.use('/css', express.static(__dirname + 'static/css'))
app.use('/js', express.static(__dirname + 'static/js'))
app.use('/images', express.static(__dirname + 'static/images'))

// set views 
app.set('views', './views')
app.set('view engine', 'ejs')

app.get('/:userQuery', (req, res) => {
    res.render('index', {data : {userQuery: req.params.userQuery,
                                searchResults : ['Albert', 'Bart', 'Chiara']}})
})

// app.get('/', (req, res) => {
//     res.render('index', {text: 'this is EJS'})
// })

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




