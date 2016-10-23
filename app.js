var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fetch = require('node-fetch');
var path = require('path');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

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

//Sample insertion to datastore
//db.insert(song, function(err, newSong) {
//  if (err) console.log(err);
//    console.log(newSong);
//});

//Make Route
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/index.html'));
})

db.find({room : 'el fiesto'}, function (err,songs){ console.log(songs); });

app.get('/songs', function(req, res) {
  db.find({}).exec(function(err,songs){
    if(err) res.send(err);
    res.json(songs);
  });
});

//Gets all data
/*
fetch('http://localhost:8081/songs').then(res => {
  if (res.ok) {
    res.json().then(data => console.log(data))
  } else {
    console.log(res)
  }
})
*/

//POSTS song into db
/*
fetch('http://localhost:8081/songs', {
  method: "POST",
  body: { room: "thecoolroom", description: "A Dank Party Yo" }
}).then(res => {
  if (res.ok) {
    res.json().then(data => console.log(data))
  } else {
    console.log(res)
  }
})
*/
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


var server = app.listen(8081, function () {
  var host = server.address().address
  var port = server.address().port
             
  console.log("Example app listening at http://%s:%s", host, port)
});

