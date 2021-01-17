const express = require("express");
const app = express();
const port = 3000;
const https = require('https');const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const location = req.body.cityName;
    const continent = req.body.continentName; 
    const unit = 'metric';
    const apiKey = 'cf076bdf72cb2750703c8f245f6f0090';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+ apiKey +'&units=' + unit + '';
    const urlTime = 'https://worldtimeapi.org/api/timezone/'+continent+'/'+location+'';

    https.get(url, function(response) {
        console.log(response.statusCode);

        response.on('data', function(data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const focusTemp = Math.ceil(temp);
            const description = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imgURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png";
            res.write("<h1>Weather description:" + description + ".</h1>");
            res.write("<h1>The temperature in " + location + " is " + focusTemp + " degress Celcius.</h1>");
            res.write("<img src=" +imgURL+">");

            https.get(urlTime, function(response) {
                console.log(response.statusCode);
                response.on('data', function(data) {
                    const timeData = JSON.parse(data);
                    const time = timeData.timezone;
                    const date = timeData.datetime;
                    res.write("<p>The time zone is "+time+".</p>");
                    res.write("<p>The date and time is "+date+".</p>");
                    res.send();
                })
            })
        })
    })
})

app.listen(port, function() {
    console.log('Serving on port ' + port + '.');
})
