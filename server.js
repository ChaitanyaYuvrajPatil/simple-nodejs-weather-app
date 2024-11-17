const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express()
const apiKey = '*****************';

// Set base path for the application
const BASE_PATH = '/weatherapp';

// Serve static files with the base path
app.use(BASE_PATH, express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs')

// Update routes to include base path
app.get(BASE_PATH, function (req, res) {
  res.render('index', {weather: null, error: null, basePath: BASE_PATH});
})

app.post(BASE_PATH, function (req, res) {
  let city = req.body.city;
  let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
  request(url, function (err, response, body) {
    if(err){
      res.render('index', {weather: null, error: 'Error, please try again', basePath: BASE_PATH});
    } else {
      let weather = JSON.parse(body)
      if(weather.main == undefined){
        res.render('index', {weather: null, error: 'Error, please try again', basePath: BASE_PATH});
      } else {
        let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
        res.render('index', {weather: weatherText, error: null, basePath: BASE_PATH});
      }
    }
  });
})

app.listen(5000, function () {
  console.log('Weather app listening on port 5000!')
})