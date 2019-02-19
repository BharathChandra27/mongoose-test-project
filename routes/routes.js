// Importing required modules
var express = require('express')
var router = express.Router()
var mongoose = require('mongoose')

// mongoose setup
mongoose.connect('mongodb://localhost:27017/testDB')
var Schema = mongoose.Schema
var userData = new Schema({
  name: String,
  email: String,
  text: String
}, {collection: 'UserDB'})
var db = mongoose.model('db', userData)

// Default data in DB
var builtIn = {
  name: 'admin',
  email: 'bharath@gmail.com',
  text: 'Happy learning !!!'
}
var ok = new db(builtIn)
ok.save()

// Setting routing paths
router.get('/', (req, res) => {
  res.render('index')
  console.log('Home...')
})
router.post('/insert', (req, res) => {
  var items = {
    name : req.body.userName,
    email : req.body.userEmail,
    text : req.body.userText 
  }
  var data = new db(items)
  data.save()
  console.log(req.body.userName, req.body.userEmail, req.body.userText)
  console.log('Inserted new MutationRecord...')
  res.redirect('/')
})
router.get('/loaddata', (req, res) => {
  db.find()
    .then(function(doc) {
      console.log('Loading Data...')
      res.render('index', { items: doc })
    })
})
router.post('/update', (req, res) => {
  var id = req.body.userId
  db.findById(id, function(err, doc) {
    if(err) {
      console.log('Error!! Fields can not be empty....')
    } else {
      doc.name = req.body.userName,
      doc.email = req.body.userEmail,
      doc.text = req.body.userText
      doc.save()
    }
    console.log('Updated...')
    res.redirect('/')
  })
})
router.post('/delete', (req, res) => {
  var id = req.body.userId
  db.findByIdAndRemove(id).exec()
  console.log('Removed...')
  res.redirect('/')
})

// Exporting the router
module.exports = router;
