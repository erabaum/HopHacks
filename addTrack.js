var track;
var res;

var searchTracks = function () {
  var query = document.getElementById('query').value;
  var group_name = document.getElementById('group_name').value;

  // Query for the data first track related to that name
  $.ajax({
    method: "GET",
    url: 'https://api.spotify.com/v1/search?type=track&q=' + query +'',
    success: function(response) {	
      res = response;
      if (response.tracks.items.length) {
        track = response.tracks.items[0];
      }
    },
    error: function(response) {
      console.log(response);
    }
  });

  // Set the data just queried
  var data = {
    'room' : group_name
    'description' : track.id
  }

  var url = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')

  fetch('ec2-52-207-254-231.compute-1.amazonaws.com:8081/songs.db', { //Change this URL to the one with songs.db
    method: "POST",
    body: url
  }).then(res => {
    if (res.ok) {
      res.json().then(data => console.log(data))
    } else {
      console.log(res)
    }
  })

}
