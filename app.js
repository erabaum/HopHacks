var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// Static Files
app.use('/public', express.static(__dirname + '/public'));
app.use('/js', express.static(__dirname + '/js'));

//Endpoints
app.get('/', function (req, res) {
  console.log('GET on /');
  res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/DJEnter', function(req, res) {
  console.log('GET on /DJEnter');
  res.sendFile(path.join(__dirname + '/public/DJLogin.html'));
});

app.get('/ListenerEnter', function(req, res) {
  console.log('GET on /ListenerEnter');
  res.sendFile(path.join(__dirname + '/public/JoinGroupListener.html'));
});

app.get('/songs', function(req, res) {
  db.find({}).exec(function(err,songs){
    if(err) res.send(err);
    res.json(songs);
  });
});

// Alternate Post song into db
app.post('/add', function(req, res) {
  var song = {
    room: req.body.room, description: req.body.description
  };
  db.insert(song, function(err,song) {
    if (err) res.send(err);
    res.json(song);
  });
});

//Make Datastore
var Datastore = require('nedb');
var db = new Datastore({
  filename: 'songs.db', // provide a path to the database file 
  autoload: true, // automatically load the database
  timestampData: true // automatically add and manage the fields createdAt and updatedAt
});

//Sample song that can be added to datastore
var song = {
  room: 'el fiesto',
  description: '##############',
};

db.find({room : 'el fiesto'}, function (err,songs){ console.log(songs); });

var server = app.listen(8081, function () {                                      
  var host = server.address().address                                            
  var port = server.address().port                                               
                                                                                 
  console.log("Example app listening at http://%s:%s", host, port)               
});  
