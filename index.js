var express = require('express');
var app = express();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://sam:adminsam123@ds235302.mlab.com:35302/ntwoc";
var dbName = "ntwoc"

var bodyParser = require('body-parser')
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

function pushDetails(_user, _obj) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = _obj;
        if (_user = 'Mentor'){
            var user = "mentor";
        } else if (_user = 'Student') {
            var user = "student"
        } else if (_user = 'Reply') {
            var user = "reachout"
        } else {
            var user = "reachout"
        }

        dbo.collection(user).insertOne(myobj, function(err, res) {
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
app.use('/student-form', express.static('public/student-form'))
app.use('/mentor-form', express.static('public/mentor-form'))
app.use('/mentor-doc', express.static('public/woc-docs/mentor-guide.pdf'))
app.use('/student-doc', express.static('public/woc-docs/student-guide.pdf'))

app.get('/api', function(req, res){
   res.send("API is not available openly");
});

app.post('/api/register', (req,res)=>{
    var reqdata = req.body;
    console.log(req.body.user);
    delete reqdata['user'];
    console.log(reqdata);
    pushDetails(req.body.user, reqdata);
    res.json('Data Uploaded');
})

app.post('/api/reply', (req,res)=>{
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db(dbName);
        var myobj = req.body;
        var user = "reachout";
        dbo.collection(user).insertOne(myobj, function(err, res) {
          if (err) throw err;
          console.log("1 document inserted");
          db.close();
        });
      });
    res.redirect('/')
})

app.get('*', function(req, res){
    res.send("Error 404");
 });

app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
});