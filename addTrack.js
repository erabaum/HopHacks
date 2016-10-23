var track;
var res;

var searchTracks = function () {
  var query = document.getElementById('query').value;
  var group_name = document.getElementById('group_name').value;
  // alert("Hello World!");
  $.ajax({
    method: "GET",
    url: 'https://api.spotify.com/v1/search?type=track&q=' + query +'',
    success: function(response) { 
      res = response;
      if (response.tracks.items.length) {

        track = response.tracks.items[0];

        app.post('/add', function(req, res) {
          var song = {
            room: group_name, description: track,
          };
          db.insert(song, function(err,song) {
            if (err) res.send(err);
            res.json(song);
          });
          res.redirect('/');
        });
      });

    }
  },
    error: function(response) {
      console.log(response);
    }
});
}


// f.addEventListener('submit', function(e) {
//   alert("1");
//   e.preventDefault();
//   alert("1");
//   searchTracks(document.getElementById('query').value);
// }, false);

