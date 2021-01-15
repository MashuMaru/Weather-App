const express = require("express");
const app = express();
const port = 3000;
const https = require('https');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    const location = req.body.cityName;
    const apiKey = 'cf076bdf72cb2750703c8f245f6f0090';
    const url = 'https://api.openweathermap.org/data/2.5/weather?q='+location+'&appid='+ apiKey +'';
    https.get(url, function(response) {
        console.log(location);
        console.log(apiKey);
    })


    res.send();
})

app.listen(port, function() {
    console.log('Serving on port ' + port + '.');
})
