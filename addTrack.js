
var track;
var res;
var groupName;

var getGroupName = function () {
  groupName = document.getElementById('groupName').value;
} 

var searchTracks = function () {
  var query = document.getElementById('query').value;
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
    },
    error: function(response) {
    	console.log(response);
    }
  });

  var data = {
    'room' : groupName
    'description' : track.id
  }

  var url = Object.keys(data).map(function(k) {
    return encodeURIComponent(k) + '=' + encodeURIComponent(data[k])
  }).join('&')

  fetch('http://localhost:8081/songs', { //Change this URL to the one with songs.db
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


// f.addEventListener('submit', function(e) {
//   alert("1");
//   e.preventDefault();
//   alert("1");
//   searchTracks(document.getElementById('query').value);
// }, false);
