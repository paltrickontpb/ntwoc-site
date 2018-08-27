
var express = require('express');
var app = express();

var port = process.env.PORT || 3000;

app.use('/', express.static('public'))

app.get('/api', function(req, res){
   res.send("Hello world!");
});

app.get('*', function(req, res){
    res.send("Error 404");
 });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});