// Importing required modules
const express = require('express')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const path = require('path')
var logger = require('morgan')
const router = require('./routes/routes')

const app = express()
const port = 2000

// view engine setup
app.engine('hbs', hbs({extname: 'hbs'}))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'hbs')

// other setup
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.static('public'))

app.use('/', router)

// Setting server to listen on port
app.listen(port, (req, res) => {
    console.log('Server Started listening at port: ' + port)
})