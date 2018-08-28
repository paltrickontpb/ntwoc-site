var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://sam:adminsam123@ds235302.mlab.com:35302/ntwoc";
var dbName = "ntwoc"

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function pushDetails(_user, _name, _info, _abstract, _misc) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = { 
            name: _name, 
            info: _info, 
            abstract: _abstract,
            misc: _misc
        };
        dbo.collection(_user).insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
}

var port = process.env.PORT || 3000;

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.use('/', express.static('public'))

app.get('/api', function(req, res){
   res.send("Hello world!");
});

app.post('/api/register', (req,res)=>{
    pushDetails(req.body.user, req.body.name, req.body.info, req.body.abstract, req.body.misc);
    res.json('Data Uploaded');
})

app.get('*', function(req, res){
    res.send("Error 404");
 });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});