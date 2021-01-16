const express = require("express");
const app = express();
const port = 3000;
const https = require('https');
const bodyParser = require("body-parser");
const { query } = require("express");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const location = req.body.cityName;
    const unit = 'metric';
    const apiKey = 'cf076bdf72cb2750703c8f245f6f0090';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+ apiKey +'&units=' + unit + '';
    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const focusTemp = Math.ceil(temp);
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            console.log(location);
            console.log(focusTemp + '°C');
            res.write("<p>The weather is " + description + ".</p>");
            res.write("<h1>The temperature in " + location + " is " + focusTemp + " degress Celcius.</h1>");
            res.write("<img src=" +imgURL+">");
            res.send();
        })
    })
})

app.listen(port, function() {
    console.log('Serving on port ' + port + '.');
})
