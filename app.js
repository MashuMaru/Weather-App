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
    console.log(req.body.cityName);

    res.send();
})

app.listen(port, function() {
    console.log('Serving on port ' + port + '.');
})


