const express = require('express')
const app = express()
const port = 1200

app.get('/', (req, res) => {
    res.send('hello world!')
})

app.listen(port, () => {
    console.log('example app listening at http://localhost:${port}')
})