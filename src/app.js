const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebars engine and views location
app.set('view engine', 'hbs')//allows u too set a value for a given express setting 
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))


//for app.get => first argument is the route taken by the user
//second argument is the function which describes what to send back when someone visits that page 
app.get('', (req,res) => {
  res.render('index', {
    title: 'Weather',
    name: 'Lokita Varma'
  })
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: "About me",
    name: 'Lokita Varma'
  })
})

app.get('/help', (req,res) => {
  res.render('help', {
    message: 'This is the help message.',
    title: 'Help',
    name: 'Lokita Varma'
  })
})

app.get('/weather', (req, res) => {
  if(!req.query.address) {
    return res.send({
      error: 'Please provide an address'
    })
  }
  geocode(req.query.address, (error,{latitude, longitude, location} = {}) =>{
    if(error) {
      return res.send({error})
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if(error){
        return res.send({error})
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      })
    })
  })
})

app.get('/products' , (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'you must provide a search term'
    })
  }
  console.log(req.query.search)
  res.send({
    products:[]
  })
})

app.get('/help/*', (req, res) => {
  res.render('error', {
  title: '404',
  message: 'help article not found',
  name: 'Lokita Varma'
  })
})

app.get('*', (req,res) => {
  res.render('error', {
  title: '404',
  message: 'Page not found.',
  name: 'Lokita Varma'
  })
})// '*' is a wild card character.  This means match anything that hasn't been matched so far


app.listen(port, () => {
  console.log('Server is up on port '+ port)
})