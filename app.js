const express = require("express");
const app = express();
const port = 3000;

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

app.post('/', function(req, res) {
    res.send('does this work?');
})

app.listen(port, function() {
    console.log('Serving on port ' + port + '.');
})


