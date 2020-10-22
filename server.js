const express = require('express')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const session = require('express-session')
require('dotenv').config()

const app = express()

//env variables
const PORT = process.env.PORT
const mongodbURI = process.env.MONGODBURI

// Middleware to help with form submission
app.use(express.urlencoded({extended:true}));

app.use(methodOverride('_method'))

app.use(express.static('public'))

// sessions
app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false
  })
)

// Mongoose connection code
mongoose.connect(mongodbURI, { useNewUrlParser: true});
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo')
})

// controllers
const playlistController = require('./controllers/playlist.js')
app.use('/playlist', playlistController)

// Home Page
app.get('/', (req, res) => {
  res.render('home.ejs')
})





app.listen(PORT, ()=> {
	console.log("Hello")
})
