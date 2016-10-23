var track;
var res;
var groupName;

var getGroupName = function () {
  groupName = document.getElementById('groupName').value;
} 

var searchTracks = function () {
  var query = document.getElementById('query').value;
<<<<<<< HEAD
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
=======
  // alert("Hello World!");
  $.ajax({
      method: "GET",
      url: 'https://api.spotify.com/v1/search?type=track&q=' + query +'',
      success: function(response) {	
      	res = response;
        if (response.tracks.items.length) {
        
          track = response.tracks.items[0];
          document.write(track.id);
          document.write(groupName);
      	}
>>>>>>> 47ab76de567d9ac7cc96e3805777cd2e1ef02e5f
    },
    error: function(response) {
      console.log(response);
    }
  });

  // Set the data just queried
  var data = {
    'room' : groupName
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
